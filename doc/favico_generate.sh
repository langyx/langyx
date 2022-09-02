FILES=*.svg
for f in $FILES
do
    FULL_FILENAME=$f
    FILENAME=${FULL_FILENAME##*/}
    echo ${FILENAME%%.*}
    svg2png $FULL_FILENAME ${FILENAME%%.*}"_256.png" -w 256
    svg2png $FULL_FILENAME ${FILENAME%%.*}"_128.png" -w 128
    svg2png $FULL_FILENAME ${FILENAME%%.*}"_64.png" -w 64
    svg2png $FULL_FILENAME ${FILENAME%%.*}"_48.png" -w 48
    svg2png $FULL_FILENAME ${FILENAME%%.*}"_32.png" -w 32
    svg2png $FULL_FILENAME ${FILENAME%%.*}"_24.png" -w 24
    svg2png $FULL_FILENAME ${FILENAME%%.*}"_16.png" -w 16
    magick convert ${FILENAME%%.*}"_256.png" ${FILENAME%%.*}"_128.png" ${FILENAME%%.*}"_64.png" ${FILENAME%%.*}"_48.png" ${FILENAME%%.*}"_32.png" ${FILENAME%%.*}"_24.png" ${FILENAME%%.*}"_16.png" ${FILENAME%%.*}.ico
done
