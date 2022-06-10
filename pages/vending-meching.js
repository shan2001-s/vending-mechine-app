import "bulma/css/bulma.css"
import Head from 'next/head'
import Web3 from "web3"
import VendingMechingContract from '../blockchain/vending'
import styles from "../styles/VendingMeching.module.css"
import { useState, useEffect } from 'react'

const VendingMeching = () => {
    //window.ethereum
    

    const [error, seterror] = useState("")
    const [inventory, setinventory] = useState("")
    const [myDonutCount, setmyDonutCount] = useState('')
    const [BuydonutQty, setBuyDountQty] = useState('')
    const [web3, setweb3] = useState(null)
    const [address, setAddress] = useState(null)
    const [vmContract, setVmContract] = useState(null)


    const getVendingInventoryHandle = async () => {
        const getVending = await vmContract.methods.getVendingMachineBalance().call();
        setinventory(getVending);

    }

    const getMyDonutCountHandle = async () => {
       
     
        const count = await vmContract.methods.donutBalances(address).call();
        setmyDonutCount(count);

    }

    const updateDountQtyHandle = event=>{
       setBuyDountQty( event.target.value);
    }

    const buyDonutHandle = async ()=>{
       
     try {
        await vmContract.methods.purchase(BuydonutQty).send({
            from: account[0],
            value:web3.utils.toWei('2','ether') * BuydonutQty
        })
         
     } catch (err) {
        seterror(err.message);
     }
        
    }



    const connectWalletHandler = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") { // if you have no this error
            try { // try catch for when user cancel the connecting metamask

                /* connect wallet */
                await window.ethereum.request({ method: "eth_requestAccounts" }) // when you use "await" u have to add "async()"
                web3 = new Web3(window.ethereum); // connect with your metamask
                setweb3(web3)

                /* get my donut count*/
                const accounts = await web3.eth.getAccounts();
                setAddress=accounts[0];
                console.log (accounts)
                console.log(setAddress)

               

                /*  create local contract copy*/
                const vm =VendingMechingContract(web3)
                setVmContract(vm)
               
            } catch (err) {
                console.log(err.message);
                seterror(err.message);
            }

        }
        else {
            alert("Please Install MetaMask");
        }
    }

    
    

    useEffect(() => {
        
          if(vmContract) getVendingInventoryHandle();
         if(vmContract && address) getMyDonutCountHandle();

 },[vmContract,address]);
  


    return (
        <div className={styles.main}>
            <Head>
                <title>Create BlockChain App</title>
                <meta name="description" content="Creating BlockChain App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <nav className="navbar mt-5 mb-5">
                <div className="container">
                    <div className="navbar-brand ">
                        <h1 >Vending Meching</h1>
                    </div>


                    <div className="navbar-end">
                        <div className="navbar-item">


                            <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>



                        </div>
                    </div>
                </div>

            </nav >
            <section>
                <div className="container">
                    <p>Vending Mechine Investory: {inventory}</p>
                </div>
            </section>
            <section>
                <div className="container">
                    <p>My donut count {myDonutCount}</p>
                </div>
            </section>
            <section>
                <div className="container has-text-danger">
                    <p>{error}</p>
                </div>
            </section>
            <section>
                <div className="field container mt-5">
                    <label className="label">Name</label>
                    <div className="control">
                    <input className="input is-primary"  onChange={updateDountQtyHandle} type="number" placeholder="Enter amount ........"></input>
                    </div>
                    <div className="control mt-3">
                        <button onClick={buyDonutHandle} className="button is-primary">Buy</button>
                    </div>
                  
                </div>

            </section>
        </div >

    )
}

export default VendingMeching