# aws-transcribe-to-vtt

This utility takes the JSON from [Amazon AWS Transcribe](https://aws.amazon.com/transcribe/) and outputs a VTT file. There is a webdriver included to test the outputted VTT file, which will prompt for a link to the video and display the video with subtitles on a temporary local server.

The outputted VTT file is saved to `output/output.vtt`. Easiest way to run is place the JSON from AWS inside the root folder, and then simply type the name of the file when you are running the utility.

## Running:
### To test:
    node test

### To run
    node index.js
