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
    const [purchase, setPurchase] = useState(0)
    const [successMsg, setsuccessMsg] = useState(null)
    const [loadBtn, setloadBtn] = useState('')


    useEffect(() => {
        
      
        if(vmContract) getVendingInventoryHandle();
       if(vmContract && address) getMyDonutCountHandle();

},[vmContract,address,purchase]);

    const getVendingInventoryHandle = async () => {
        const getVending = await vmContract.methods.getVendingMachineBalance().call();
        setinventory(getVending);

    }

    const getMyDonutCountHandle = async () => {
       
     
        const count = await vmContract.methods.donutBalances(address).call()
        console.log(count);
        setmyDonutCount(count);



    }

    

    const updateDountQtyHandle = event=>{
       setBuyDountQty( event.target.value);
    }

    const buyDonutHandle = async ()=>{
       
     try {
        setloadBtn(<button class="button is-primary is-loading">Loading</button>)
        await vmContract.methods.purchase(BuydonutQty).send({
            from: address,
            value:web3.utils.toWei('2','ether') * BuydonutQty
        })
        setsuccessMsg(`${count} Donut get Success!!`)
        setPurchase++;
         
     } catch (err) {
        seterror(err.message);
     }
        
    }



    const connectWalletHandler = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") { // if you have no this error
            try { // try catch for when user cancel the connecting metamask

                /* connect wallet */
                await window.ethereum.request({ method: "eth_requestAccounts" }) // when you use "await" u have to add "async()"
                const web3 = new Web3(window.ethereum); // connect with your metamask
                setweb3(web3)

                /* get my donut count*/
                const accounts = await web3.eth.getAccounts()
                setAddress(accounts[0]);
                console.log (accounts)
                console.log(setAddress)

               

                /*  create local contract copy*/
                const vm =VendingMechingContract(web3)
                setVmContract(vm)

              //  getMyDonutCountHandle()
               
            } catch (err) {
                console.log(err.message);
                seterror(err.message);
            }

        }
        else {
            alert("Please Install MetaMask");
        }
    }




    return (
        <div className={styles.main}>
            <section className={styles.bg}>
            <Head>
                <title>Create BlockChain App</title>
                <meta name="description" content="Creating BlockChain App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
          
                <div className="container">
                    <div className="navbar-brand ">
                       
                    </div>


                   
                </div>

           
           
          
          



          
            

        
            <div className="container is-max-desktop "    >
            <div class="card ">
                <div class="card-image container">
                <figure class="image is-256x256">
                <img  src="/eth.jpg"  alt="Placeholder image"></img>
                </figure>
            </div>
              
                <div class="card-content" >
               
    <div class="media">
      <div class="media-left">
        <figure class="image is-128x128">
        <img  src="/donut.jpg"  alt="Placeholder image"></img>
        <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
        </figure>
        

      </div>
      <div class="media-content">
      
        <p class="title is-4 my-5 ml-3">Vending Mechine Investory:   <b> {inventory} left </b> </p>
        <p class="title is-5 ml-3">My donut count = <b> {myDonutCount} </b> </p>
      </div>
    </div>
               <br>
               </br>
            
            <section  >
                <div className="field container mt-5">
                    <label className="label">Qty</label>
                    <div className="control">
                    <input className="input is-primary"  onChange={updateDountQtyHandle} type="number" placeholder="Enter amount ........"></input>
                    </div>
                    <div className="control mt-3">
                        <button onClick={buyDonutHandle} className="button is-primary">Buy</button>
                        {loadBtn}
                    </div>
                  
                </div>

            </section>

            <section>
                <div className="container has-text-danger">
                    <p>{error}</p>
                </div>
            </section>

            <section>
                <div className="container has-text-success">
                    <p>{successMsg}</p>
                </div>
            </section>

                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                        <a href="#">#css</a> <a href="#">#responsive</a>
                        <br>
                        </br>
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                </div>
            </div>
            </div>
            </section>
             
            <section className={styles.custom}> 
			  <h2>Welcome to Bulma!</h2>
	      </section>
        </div >

        

    )
}

export default VendingMeching

// import Head from 'next/head'
// import { useState, useEffect } from 'react'
// import Web3 from 'web3'
// import VendingMechingContract from '../blockchain/vending'
// import 'bulma/css/bulma.css'
// //import styles from '../styles/VendingMachine.module.css'

// const VendingMachine = () => {
//     const [error, setError] = useState('')
//     const [successMsg, setSuccessMsg] = useState('')
//     const [inventory, setInventory] = useState('')
//     const [myDonutCount, setMyDonutCount] = useState('')
//     const [buyCount, setBuyCount] = useState('')
//     const [web3, setWeb3] = useState(null)
//     const [address, setAddress] = useState(null)
//     const [vmContract, setVmContract] = useState(null)
   

//     useEffect(() => {
//       if (vmContract) getInventoryHandler()
//       if (vmContract && address) getMyDonutCountHandler()
//     }, [vmContract, address])

//     const getInventoryHandler = async () => {
//       const inventory = await vmContract.methods.getVendingMachineBalance().call()
//       setInventory(inventory)
//     }

//     const getMyDonutCountHandler = async () => {
//       const count = await vmContract.methods.donutBalances(address).call()
//       setMyDonutCount(count)
//     }

//     const updateDonutQty = event => {
//       setBuyCount(event.target.value)
//     }

//     const buyDonutHandler = async () => {

//         await vmContract.methods.purchase(buyCount).send({
//           from: address,
//           value: web3.utils.toWei('2', 'ether') * buyCount

//         //console.log("try to purchase");
//         // await vmContract.methods.purchase(parseInt(buyCount)).send({
//         //   from: address,
//         //   value: web3.utils.toWei('2', 'ether') * buyCount,
//         //   gas: 3000000,
//         //   gasPrice: null

//         // })
//         })
    
        
      

      
//     }

//     const connectWalletHandler = async () => {
//       /* check if MetaMask is installed */
//       if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
//           try {
//             /* request wallet connect */
//             await window.ethereum.request({ method: "eth_requestAccounts" })
//             /* create web3 instance and set to state var */
//             const web3 = new Web3(window.ethereum)
//             /* set web3 instance */
//             setWeb3(web3)
//             /* get list of accounts */
//             const accounts = await web3.eth.getAccounts()
//             /* set Account 1 to React state var */
//             setAddress(accounts[0])
            

//             /* create local contract copy */
//             const vm = VendingMechingContract(web3)
//             setVmContract(vm)
//           } catch(err) {
//             setError(err.message)
//           }
//       } else {
//           // meta mask is not installed
//           console.log("Please install MetaMask")
//       }
//     }

//     return (
//         <div >
//           <Head>
//             <title>VendingMachine App</title>
//             <meta name="description" content="A blockchain vending app" />
//           </Head>
//           <nav className="navbar mt-4 mb-4">
//             <div className="container">
//                 <div className="navbar-brand">
//                   <h1>Vending Machine</h1>
//                 </div>
//                 <div className="navbar-end">
//                     <button onClick={connectWalletHandler} className="button is-primary">Connect Wallet</button>
//                 </div>
//             </div>
//           </nav>
//           <section>
//               <div className="container">
//                   <h2>Vending machine inventory: {inventory}</h2>
//               </div>
//           </section>
//           <section>
//               <div className="container">
//                   <h2>My donuts: {myDonutCount}</h2>
//               </div>
//           </section>
//           <section className="mt-5">
//               <div className="container">
//                 <div className="field">
//                   <label className="label">Buy donuts</label>
//                   <div className="control">
//                     <input onChange={updateDonutQty} className="input" type="type" placeholder="Enter amount..." />
//                   </div>
//                   <button 
//                     onClick={buyDonutHandler} 
//                     className="button is-primary mt-2"
//                   >Buy</button>
//                 </div>
//               </div>
//           </section>
//           <section>
//               <div className="container has-text-danger">
//                   <p>{error}</p>
//               </div>
//           </section>
//           <section>
//               <div className="container has-text-success">
//                   <p>{successMsg}</p>
//               </div>
//           </section>
//         </div>
//     )
// }

// export default VendingMachine
