#!/bin/sh -x
verify_ui() {
  curl -s http://ressignifica-ui:3000 > /dev/null
}

verify_api() {
  curl -s http://ressignifica-api:4000 > /dev/null
}

verify_db() {
  nc -z ressignifica-db 5432
}

verify_sut() {
  verify_ui && verify_api && verify_db
}

verify_hub() {
  curl -s http://ressignifica-hub:4444 > /dev/null
}

verify_chrome() {
  curl -s http://ressignifica-chrome:5555 > /dev/null
}

verify_firefox() {
  curl -s http://ressignifica-firefox:5555 > /dev/null
}

verify_selenium() {
  verify_hub && verify_chrome && verify_firefox
}

e2e() {
  LOG=$1
  yarn e2e --tags 'not @doing' > "$LOG" && cat "$LOG"
}

run_at() {
  BROWSER=$1
  ATTEMPT=${2:-5}
  if [ $ATTEMPT -eq 0 ]; then
    exit 1
  else
    export BROWSER
    LOG="$SCREENSHOTS/$BROWSER"
    mkdir -p "$LOG"
    e2e "$LOG/e2e.log" || run_at "$BROWSER" $((ATTEMPT - 1))
  fi
}

main() {
  which curl > /dev/null || (apk update && apk add curl) || exit 1
  retries="${RETRIES:-10}"
  interval="${INTERVAL:-10s}"
  while [ true ]; do
    if [ $retries -gt 0 ]; then
      result="$(verify_sut && verify_selenium && echo ok || echo fail)"
      if [ $result = "fail" ]; then
        sleep $interval
      else
        rm -frv "$SCREENSHOTS"
        export && yarn install
        run_at "chrome"
        run_at "firefox"
        exit 0
      fi
      retries=$((retries - 1))
    else
      exit 1
    fi
  done
}

main
