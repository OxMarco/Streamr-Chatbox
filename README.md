<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Streamr decentralised chatbox</h3>

  <p align="center">
    A simple plug&play ReactJS module to add a fully-decentralised and permissionless chatbox powered by Streamr.
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
  </p>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Simply sign the challenge with your preferred wallet provider and you are ready to chat!
If you got an ENS name for your wallet, it will be used on behalf of your wallet address. Chats are ephemeral, not logged or stored anywhere. Due to the decentralised nature of the tool, the content posted by users cannot be subject to moderation.
The chat supports all UTF-8 characters and is language-agnostic. For security reasons you cannot use BBCode or HTML code, any spurious tag will be stripped out.

### Built With

* [Streamr](https://streamr.network/)
* [ReactJS](https://reactjs.org/)
* [FontAwesome](https://fontawesome.com/)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

In order to build this package you will need NodeJS and Yarn installed on your machine.

### Installation and local testing

1. Clone the repo
   ```sh
   git clone https://github.com/grcasanova/Streamr-Chatbox.git
   ```
2. Install required packages
   ```sh
   yarn install
   ```
3. Generate a new stream in the form *0x000.../name* and give it anonymous publishing permissions
   ```sh
   yarn create-stream -k YOUR_PRIVATE_KEY -a YOUR_WALLET_ADDRESS -s YOUR_STREAM_NAME
   ```
4. Replace the stream ID (*0x000.../name*) in App.jsx line 7
  ```sh
  const STREAM_ID = "your stream ID"
  ```
5. Execute the demo app
   ```sh
   yarn start
   ```

<!-- USAGE EXAMPLES -->
## Usage

This plugin works with Ethereum mainnet and Rinkeby testnet only.

To use this package in your (d)app simply:
1. install it with `yarn add @streamr-chatbox` 
2. import it locally using `import Chatbox from "streamr-chatbox"`
3. instantiate the component passing the required params `<Chatbox provider={injectedProvider} address={address} streamID={STREAM_ID} />`

The component needs the following parameters to work:
* *provider*: web3 provider (MetaMask, WalletConnect, Web3Modal, ...)
* *address*: (the user address in hexadecimal form as a string)
* *streamID*: your generated stream ID as a string in the form "0x000.../name"

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the GPLv3 License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact


Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/github_username