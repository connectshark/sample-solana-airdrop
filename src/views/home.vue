<script setup>import { ref } from "vue"

const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account
} = require("@solana/web3.js")
const myWalletAddress = ref('')
const myWalletBalance = ref(0)
const newPair = new Keypair()

const publicKey = new PublicKey(newPair._keypair.publicKey).toString()
myWalletAddress.value = publicKey

const secretKey = newPair._keypair.secretKey


const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
    const myWallet = await Keypair.fromSecretKey(secretKey)
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    )
    myWalletBalance.value = parseInt(walletBalance) / LAMPORTS_PER_SOL
    console.log(`=> For wallet address ${publicKey}`)
    console.log(`   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`)
  } catch (err) {
    console.log(err)
  }
}
const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey)
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    )
    await connection.confirmTransaction(fromAirDropSignature)
  } catch (err) {
    console.log(err)
  }
}

const driverFunction = async () => {
  await getWalletBalance()
  await airDropSol()
  await getWalletBalance()
}

driverFunction()
</script>

<template>
  <div class="home">
    <h1>A simple project for SOLANA AIRDROP</h1>
    <div class="content">
      <p>My wallet address</p>
      <p>
        <span class="detail">{{ myWalletAddress }}</span>
      </p>
    </div>
    <div class="content">
      <p>My wallet balance</p>
      <p>
        <span class="detail">{{ myWalletBalance }}SOL</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 2rem;
  line-height: 1.5;
  padding: 1rem 0;
}
.content {
  padding: 1rem;
  background-color: #fff;
  width: 90%;
  max-width: 600px;
  margin: auto;
  margin-bottom: 3rem;
  box-sizing: border-box;
  p{
    padding: 1rem 0;
  }
  .detail {
    background-color: #ccc;
    font-size: 1.5rem;
    word-break: break-all;
  }
}
</style>