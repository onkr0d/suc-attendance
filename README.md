# suvbc-attendance
This is a fullstack project to help Suffolk University's Volleyball Club with attendance!

## ‼️ Importance of tracking attendance
Clubs often need to know which members are regulars in order to keep track of the success of events, giveaways, and more. This project 
simplifies this by reducing the hassle of signing each member in manually to a quick QR code scan with a one time sign up. After that, all users need to
do is hit one button to ✨automagically✨ sign in. 

Other uses cases may include:
 - giving loot after X meetings attended
 - tracking success of events
 - using tracking data to measure club growth
 
## 🧐 Detailed overview
When a user visits the page for the first time, they are prompted to sign up with their name and suffolk id. After this single sign up, members
will be remembered for their next visit, which means next time they sign into the club, they won't be prompted to enter their credentials again.

This shines especially on repeat sign-ins, when a QR code + 1 click is all that's needed 🚀

After they choose a club, the server is notified of their sign in, and enters them into a Google Spreadsheet, to which the club eboard will have access to.

## 🤑 Pricing
TBD, most likely $10 baseline. Scales with club size; negotiable.

### 💻 Tech stuff
Frontend written in React.js, backend in node.js + express. This section will be expanded later 😉
