import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("GameItem", function () {
  it("Should return the new greeting once it's changed", async function () {
    const GameItem = await ethers.getContractFactory("GameItem");
    const gameItem = await GameItem.deploy();
    await gameItem.deployed();

    const playerAddress = "0x222fC57a9D6b9F8eD0d1d89E8213A01F3F671c21";
    const data = "https://game.example/item-id-8u5h2m.json";

    const awardItemTx = await gameItem.awardItem(playerAddress, data);

    await awardItemTx.wait();

    expect(await gameItem.ownerOf(1)).to.equal(playerAddress);
    expect(await gameItem.tokenURI(1)).to.equal(data);
  });
});
