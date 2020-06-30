# Gantt Chart App by Alex
## About
This Gantt Chart App displays topics, campaigns and contents. 
- Campaigns and Contents can be dragged and dropped to a new time slot.
  - Campaigns always cover whole days, since they have start- and end**date**. Hence they can only be dragged so that they cover whole days
  - Contents can be published every minute, so they can be dragged to every minute. This results in a much smaller grid than the one for campaigns
- The timeline can be zooomed in or out fluently. 
- Campaigns and contents are displayed in the swimlane of their topic or in the default topic if they don't have one. 
- The info button of the contents displays the campaign(s) they belong to.

All Relations (`topic` - `campaign` - `content`) are M:N. <br>
If you want to alter the testdata, you can do so by changing the content of the `Fakeserver.ts` file. This file is used as a fake database from where the `Chart` component retrieves its data. (A local dev server can be startet with `npm run start`)

---

## Try it out
You can try a built version [here](https://alex-co.de/gantt)

---

## Known Issues
#### Console Error `findDOMNode is deprecated in StrictMode`
Material UI uses StrictMode and the deprecated `findDOMNode` method in the transition used for the info popover for the contents. The contributors are working on a solution that is scheduled to be released in Version 5.0.0 of the API, but until then there is only an unstable fix available. Read more about it [here](https://github.com/mui-org/material-ui/issues/13394).
The warning (which is a console error) fires once.

---

## Third Party
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Material UI design by [Material UI](https://github.com/mui-org/material-ui)
- Draggable items powered by [React Draggable](https://github.com/STRML/react-draggable)
