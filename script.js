class Block {
    constructor(index, data, previousHash = '0') {
        this.index = index;
        this.timestamp = new Date().toLocaleString();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return CryptoJS.SHA256(this.index + this.timestamp + this.data + this.previousHash).toString();
    }
}

let blockchain = [];

function createGenesisBlock() {
    const genesisBlock = new Block(0, "Genesis Block", "0");
    blockchain.push(genesisBlock);
    displayBlock(genesisBlock);
}

function addBlock() {
    const data = document.getElementById("blockData").value;
    if (data.trim() === "") return alert("Please enter block data!");

    const previousBlock = blockchain[blockchain.length - 1];
    const newBlock = new Block(blockchain.length, data, previousBlock.hash);
    blockchain.push(newBlock);
    displayBlock(newBlock);
    document.getElementById("blockData").value = "";
}

function displayBlock(block) {
    const container = document.getElementById("blockchain");

    const blockDiv = document.createElement("div");
    blockDiv.className = "block";
    blockDiv.innerHTML = `
        <h3>Block #${block.index}</h3>
        <p><strong>Data:</strong> ${block.data}</p>
        <p><strong>Timestamp:</strong> ${block.timestamp}</p>
        <p><strong>Prev Hash:</strong> <div class="hash">${block.previousHash}</div></p>
        <p><strong>Hash:</strong> <div class="hash">${block.hash}</div></p>
    `;

    container.appendChild(blockDiv);
}

createGenesisBlock();
