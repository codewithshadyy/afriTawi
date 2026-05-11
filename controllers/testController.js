
// const express = require("express")

// const pool = require("../config/db")


// exports.getTests= async (req,res) => {
 
//     try {
//         const test = await pool.query("SELECT * FROM books")
//         res.status(200).json({
//             success:true,
//             data:test.rows
//         })
        
//     } catch (error) {

//         res.status(500).json({message:error.message})
        
//     }
// }