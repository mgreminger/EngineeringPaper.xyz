## Get the Word Out
The easiest way to contribute to EngineeringPaper.xyz is to get the word out. A large and vibrant user community are critical to justify continued efforts to develop this open source software. The easiest ways to contribute are to like and subscribe to the official [YouTube channel](https://www.youtube.com/channel/UCaFxwEznNUfJagZ1Xi6Rh2A), participate in the official [Reddit Community](https://www.reddit.com/r/EngineeringPaperXYZ/), or rate the app in the [Windows store](https://apps.microsoft.com/store/detail/engineeringpaperxyz/9N1W74WC2X2M). User generated tutorials or videos are also welcome.

## Reporting Bugs or Requesting Features
To report issues or bugs, or to request new features, file a 
[GitHub issue](https://github.com/mgreminger/EngineeringPaper.xyz/issues) or use the 
[official EngineeringPaper.xyz subreddit](https://www.reddit.com/r/EngineeringPaperXYZ/). If you prefer email, bugs or feature 
requests can be submitted to [support@EngineeringpPaper.xyz](mailto:support@engineeringpaper.xyz).

## Contributing
Since the [live EngineeringPaper.xyz](https://engineeringpaper.xyz) site is deployed from this repository's main branch, careful consideration is required before 
adding new features. Becuase of this, a [GitHub issue](https://github.com/mgreminger/EngineeringPaper.xyz/issues) must be created to discuss a potential new feature before an external pull request
will be considered. Keep the following in mind when considering the implementation of new features:

* All features must work in Chrome, Safari, and Firefox
* All features must be usable on both desktop and mobile
* All features must format properly when printing a sheet using the browser's file print command
* All existing tests must pass (sometimes updates to old tests will be needed, depending on the feature) and any new features will most likely need new tests
* Ease of use and robustness of EngineeringPaper.xyz are top priorities, any new feature that makes EngineeringPaper.xyz more complicated to use will require careful consideration and may not be accepted
* It must always be possible to read old sheets created in previous versions of EngineeringPaper.xyz (on rare occasions, users may need to update their sheets but there can be no data loss)
* New features that require large javascript dependencies will most likely not be accepted (EngineeringPaper.xyz is already large because of its dependency on Pyodide, every effort will be made to limit bundle size growth)

Because of the limitations inherent to a repository tied to a running site, you may want to consider hosting your own fork of EngineeringPaper.xyz if you 
want to run experimental features that are not accepted to the main EngineeringPaper.xyz repository. EngineeringPaper.xyz can be easily deployed as a
Coudflare Pages project (including the database back-end through the Pages Functions capability). It can be deployed using Cloudflare's
free tier. 

Any contributors to this repository must confirm that their contributions satisfy the [Developer Certificate of Origin](https://developercertificate.org/).

## Setting up a Development Environment
See these instructions covering [setting up an EngineeringPaper.xyz development environment](https://github.com/mgreminger/EngineeringPaper.xyz#build-instructions).
