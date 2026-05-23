import { Client, PrivateKey } from "@srbde/pollen";

const tx = {
  amount: "0.001 HIVE",
  from: "petertag",
  to: "mahdiyari",
  memo: "Sent with Pollen 🌸",
};
const privkey = "5J..."; // Replace with your key

const client = new Client(["https://api.hive.blog", "https://api.openhive.network"]);

if (privkey !== "5J...") {
  const key = PrivateKey.fromString(privkey);
  console.log("Using key:", key.inspect());

  const op = ["transfer", tx];
  client.broadcast
    .sendOperations([op], key)
    .then((res) => console.log("Success:", res))
    .catch((err) => console.error("Error:", err.message));
} else {
  console.log("Example ready. Edit index.js to add your private key.");
}
