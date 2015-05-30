#!/bin/bash

LANGUAGES=("java")
LANGUAGE_INDETS=()

for LANGUAGE in ${LANGUAGES}
do
	URL="https://api.github.com/search/repositories?q=+language:${LANGUAGE}&sort=stars&order=desc"
	TOP_REPOS=$(curl ${URL} -s -G -k | jq -r '.items[] | .full_name') 

	for REPO in ${TOP_REPOS}
	do
		echo $REPO

		TABS=0
		SPACES=0

		FILES=$(curl -s -G -k "https://api.github.com/search/code?q=repo:${REPO}+language:${LANGUAGE}" | jq -r '.items[] | .path')

		for FILE in ${FILES}
		do
			echo "-> $FILE"

			CONTENT=$(curl -s -G -k "https://raw.githubusercontent.com/${REPO}/master/${FILE}")
			INDENT=$(echo "${CONTENT}" | detect-indent | wc -m)

			if [[ $INDENT =~ '1' ]]; then
				TABS=$(( $TABS + 1 ))
			else
				SPACES=$(( $SPACES + 1 ))
			fi
		done

		if [ $TABS -ge $SPACES ]; then
			LANGUAGE_INDETS+=('TABS')
		else
			LANGUAGE_INDETS+=('SPACES')
		fi

		echo $LANGUAGES
		echo $LANGUAGE_INDETS
	done

	echo $LANGUAGES
	echo $LANGUAGE_INDETS
done