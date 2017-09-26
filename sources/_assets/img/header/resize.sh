for f in ./originals/*.jpg; do
    echo "$f"
    tmp="${f##*/}"
    echo "${tmp%.jpg}"
    convert $f -resize 5000x640 -quality 75 ./${tmp%.jpg}-small.jpg
    convert $f -resize 5000x800 -quality 80 ./${tmp%.jpg}-medium.jpg
    convert $f -resize 5000x1000 -quality 85 ./${tmp%.jpg}-large.jpg
done
