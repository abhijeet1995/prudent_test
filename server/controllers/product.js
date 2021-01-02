const Product = require('../models/product')

exports.uploadProduct = async(req,res)=>{
	try {
		let { name, brand, price, qty, image, category, description } = req.body;
		let product = new Product({
			name, brand, price, qty, image, category, description
		});
		product = await product.save(); // save to database
		res.status(200).json({
			result: 'success',
			product: product
		});
	}
	catch (err) {
		res.status(500).json({
			err: err
		});
	}
}


exports.all =async (req,res)=>{
	try{
			let product = await Product.find();
			res.status(200).json({
				product
			})
		
		
	}catch(err){
		console.log(err);
		res.status(500).json({
			error:"server"
		})
	}
}

exports.singleProduct = async(req,res)=>{
	try {
		const  id = req.params.id;
		const  product = await Product.findById(id);
		res.status(200).json({
			result: 'success',
			product: product
		});
	}
	catch (err) {
		res.status(500).json({
			error: "server"
		})
	}
}


