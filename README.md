# Hidden in Plain Sight
**A steganography technique that uses zero-width characters to encode hidden data in a plaintext string.**

***

## What is this
This website is a steganography technique that uses zero-width characters. For anyone new to steganography, it is the act of concealing messages or hidden information within a visible or non-secret medium. There are many ways of doing this like hiding information in crossword puzzles, putting extra data into files, or what's happening here.

## Why?
A few years ago, I read an article online where someone wrote a zero-width character steganography program in JavaScript or TypeScript. Unfortunately, that was a while ago so I don't remember the article or the exact details. I found that article intriguing, so I used what I learned to rewrite the program in Python. But, a Python script isn't very accessible for many people, and not everyone wants to run a random exe file from the internet. So, I decided to rewrite the program in JavaScript but with a twist.

## How it works
The Unicode specification defines characters that don't take up any visible space on screen making them hidden in plain sight(get it?). These are called zero-width characters. Most programs use one or more of the following zero-width characters: Zero-width space(U+200B), Zero-width non-joiner(U+200C), Zero-width joiner(U+200D), and/or Word joiner(U+2060). However, this means most programs are limited to binary(0s and 1s) which uses up a ton of character space. For most cases, this is fine but a text field with a character limit may cause the text to get cut off. So, my implementation allows for a maximum of 36 characters(JavaScript has a limit of base-36). This means the letter _a_ goes from 111101 in binary to 3D in base-16(with the current configuration). That's a decrease of 4 characters! My list of characters is available in the characters.txt file. To test for compatibility, copy the text or download the file and view it in your favorite text editors.

## How to use
Using the website is very simple. For encoding, put the public message that you want anyone to see in the _Public message_ text box. Then, put the hidden message into the _Private message_ text box. Finally, click encode. The output should be automatically copied to the clipboard. If it isn't, then just select all the text in the _Encoded_ box. To decode the message, simply put the encoded message into the "Encoded:" box then click decode. The public and private messages should now appear in their respective text boxes.

## Issues
Using a system greater than base-2 may cause some issues. In many text editors like Notepad or Google Docs, the characters I've chosen are invisible. However, I can't test every possible text editor in existence. So, some of the characters may be visible in certain text editors. If this does happen, feel free to fork, clone, or download the GitHub repo and edit the list of characters in the index.js file. However, this means anyone else using the website will need your edited list. Also, more advanced editors like IDEs may show the characters no matter which program or website you use to encode a hidden message.
