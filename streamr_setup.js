const axios = require('axios');
const yargs = require("yargs");
const { StreamrClient, StorageNode } = require("streamr-client");

async function main() {
    const argv = yargs
    .option('key', {
        alias: 'k',
        description: 'Pass your private key to instantiate a new stream',
        type: 'string',
    })
    .option('address', {
        alias: 'a',
        description: 'Pass your wallet address to generate a new stream',
        type: 'string',
    })
    .option('stream', {
        alias: 's',
        description: 'Give a name to the new stream',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

    if(argv.stream == undefined || argv.stream == "") argv.stream = "chatbox";

    let wallet;
    if(argv.key != null && argv.address != null)
        wallet = {
            address: argv.address,
            privateKey: argv.key
        };
    else
        wallet = StreamrClient.generateEthereumAccount();

    const client = new StreamrClient({
        auth: {
            privateKey: wallet.privateKey
        }
    });
    const token = await client.session.getSessionToken();
    
    console.log("CREATING...")

    try {
        await create(client, wallet, argv.stream);
        await approveReadingPermission(wallet, argv.stream, token);
        await approvePublishingPermission(wallet, argv.stream, token);
        await approveSubscribePermission(wallet, argv.stream, token);
        console.log("...OK")
    } catch(err) {
        console.log("...ERR");
        if (err.body) {
            console.log(err.body);
        } else {
            console.log("Generic error, retry!");
        }
    }
}

async function create(client, wallet, name) {
    const stream = await client.createStream({
        id: `${wallet.address}/${name}`,
    });
    console.log(`Stream ${stream.id} has been created`);

    // Optional: to enable historical data resends, add the stream to a storage node
    //await stream.addToStorageNode(StorageNode.STREAMR_GERMANY)
}

async function approveReadingPermission(wallet, name, token) {
    const response = await axios({
        method: 'post',
        url: `https://streamr.network/api/v1/streams/${wallet.address}%2F${name}/permissions`,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            "anonymous": true,
            "operation":"stream_get"
        }
    });

    console.log(`Stream ${wallet.address}/${name} has been approved for anonymous reading`);
}

async function approvePublishingPermission(wallet, name, token) {
    const response = await axios({
        method: 'post',
        url: `https://streamr.network/api/v1/streams/${wallet.address}%2F${name}/permissions`,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            "anonymous": true,
            "operation":"stream_publish"
        }
    });

    console.log(`Stream ${wallet.address}/${name} has been approved for anonymous publishing`);
}

async function approveSubscribePermission(wallet, name, token) {
    const response = await axios({
        method: 'post',
        url: `https://streamr.network/api/v1/streams/${wallet.address}%2F${name}/permissions`,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        data: {
            "anonymous": true,
            "operation":"stream_subscribe"
        }
    });

    console.log(`Stream ${wallet.address}/${name} has been approved for anonymous subscribing`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
