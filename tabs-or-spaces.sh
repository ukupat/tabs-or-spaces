#!/bin/bash

languages=("javascript")
indents=()

function analyse_languages() {
	for language in ${languages}
	do
		top_repos=$(get_top_repos $language)
		analyse_repos $language $top_repos
	done
}

function analyse_repos() {
	for repo in ${top_repos}
	do
		echo $repo

		analyse_files $language $repo

		echo $indents
	done
}

function analyse_files() {
	tabs=0
	spaces=0

	files=$(get_files $language $repo)

	for file in ${files}
	do
		echo "-> $file"

		content=$(curl -s -G -k "https://raw.githubusercontent.com/${2}/master/${file}")
		indent=$(echo "${content}" | detect-indent)

		echo "$indent" | grep '\t'

		if [[ $indent =~ '\t' ]]; then
			tabs=$(( $tabs + 1 ))
		else
			spaces=$(( $spaces + 1 ))
		fi
	done

	if [ $tabs -ge $spaces ]; then
		indents+=('TABS')
	else
		indents+=('SPACES')
	fi
}

function get_top_repos() {
	echo $(curl "https://api.github.com/search/repositories?q=+language:${language}&sort=stars&order=desc" -s -G -k | jq -r '.items[] | .full_name')
}

function get_files() {
	echo $(curl -s -G -k "https://api.github.com/search/code?q=repo:transferwise/log-it-down+language:javascript" | jq -r '.items[] | .path')
}

function main {
	analyse_languages

	echo $languages
	echo $indents
	echo $sizes
}

main