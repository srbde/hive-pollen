import { Client, PrivateKey, BlockchainMode } from '@srbde/pollen'

// bot is configured with environment variables
const die = (msg) => { process.stderr.write(msg + '\n'); process.exit(1) }

// the username of the bot
const BOT_USER = process.env['BOT_USER'] || 'your-bot-name'
// the posting key of the bot
const POSTING_KEY = process.env['POSTING_KEY']
// the user we want to vote the same as
const FOLLOW_USER = process.env['FOLLOW_USER'] || 'thecrazygm'
// and the vote weight to use, 10000 = 100%
const VOTE_WEIGHT = process.env['VOTE_WEIGHT'] ? parseInt(process.env['VOTE_WEIGHT']) : 10000

if (!POSTING_KEY) {
    console.log("Example ready. Set POSTING_KEY environment variable to start voting.");
} else {
    // setup the pollen client
    const client = new Client(["https://api.hive.blog", "https://api.openhive.network"])

    // deserialize the posting key
    const key = PrivateKey.from(POSTING_KEY)

    // create a new readable stream with all operations
    const stream = client.blockchain.getOperationsStream({ mode: BlockchainMode.Latest })

    console.log(`🌸 Pollen Vote Bot active. Following ${FOLLOW_USER} with ${VOTE_WEIGHT / 100}% weight`)

    stream.on('data', (operation) => {
        if (operation.op[0] === 'vote') {
            const vote = operation.op[1]
            if (vote.voter === FOLLOW_USER) {
                console.log(`${vote.voter} voted, following...`)

                const myVote = { ...vote }
                myVote.voter = BOT_USER
                myVote.weight = vote.weight > 0 ? VOTE_WEIGHT : -VOTE_WEIGHT

                client.broadcast.vote(myVote, key).then(() => {
                    console.log(`Success! Voted for https://hive.blog/@${vote.author}/${vote.permlink}`)
                }).catch((error) => {
                    console.warn('Vote failed:', error.message)
                })
            }
        }
    })
}
