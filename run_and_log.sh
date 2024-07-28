#!/bin/bash

LOG_FILE="/mnt/c/Users/tiniu/Desktop/Auto/run_log.txt"

# Function to run a command and log its output
run_and_log() {
    echo "Executing: $1" >> $LOG_FILE 2>&1
    eval $1 >> $LOG_FILE 2>&1
}

# Reduced retries and wait time for robocopy
ROBOCOPY_OPTIONS="/COPYALL /R:3 /W:10"

# Run commands in parallel
run_and_log "robocopy $ROBOCOPY_OPTIONS \"C:\\Users\\tiniu\\Desktop\\kesia2\\tests\\hooks\\useImageLoader.test.tsx\" \"C:\\Users\\tiniu\\Desktop\\Auto\\Tests\\useImageLoader.test.tsx\"" &
run_and_log "robocopy $ROBOCOPY_OPTIONS \"C:\\Users\\tiniu\\Desktop\\kesia2\\tests\\components\\carousel\\LazyImage.test.tsx\" \"C:\\Users\\tiniu\\Desktop\\Auto\\Tests\\LazyImage.test.tsx\"" &
run_and_log "robocopy $ROBOCOPY_OPTIONS \"C:\\Users\\tiniu\\Desktop\\kesia2\\tests\\components\\carousel\\Carousel.test.tsx\" \"C:\\Users\\tiniu\\Desktop\\Auto\\Tests\\Carousel.test.tsx\"" &
run_and_log "robocopy $ROBOCOPY_OPTIONS \"C:\\Users\\tiniu\\Desktop\\kesia2\\components\\hooks\\useImageLoader.ts\" \"C:\\Users\\tiniu\\Desktop\\Auto\\Src\\useImageLoader.ts\"" &
run_and_log "robocopy $ROBOCOPY_OPTIONS \"C:\\Users\\tiniu\\Desktop\\kesia2\\components\\carousel\\Carousel.tsx\" \"C:\\Users\\tiniu\\Desktop\\Auto\\Src\\Carousel.tsx\"" &
run_and_log "robocopy $ROBOCOPY_OPTIONS \"C:\\Users\\tiniu\\Desktop\\kesia2\\components\\carousel\\LazyImage.tsx\" \"C:\\Users\\tiniu\\Desktop\\Auto\\Src\\LazyImage.tsx\"" &

# Wait for all background jobs to finish
wait
