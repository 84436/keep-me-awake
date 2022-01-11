:: Generate a 10-second black screen video with...
:: - Format = AVC (since libx264 is used here)
:: - Resolution = 32x32 (https://ffmpeg.org/pipermail/ffmpeg-user/2017-October/037501.html)
:: - Frame rate = 1fps
:: - Pixel format = grayscale
:: - Audio = 10Hz sine wave playing at -40dB
::   (anullsrc or any audio with too low amplitude is not acceptable,
::    since no audio playing indicator will appear in the browser.)
::
:: This video is encoded using x264 with the ridiculous preset of "placebo."
:: Please do not use this IRL. Thanks.

@CALL FFmpeg ^
    -hide_banner ^
    -f lavfi -i "color=c=black:s=32x32:r=1" ^
    -f lavfi -i "sine=f=10" ^
    -t 10 ^
    -filter:v "format=gray" ^
    -filter:a "volume=-40dB" ^
    -c:v libx264 -preset placebo -movflags +faststart ^
    -y ^
    out.mp4
