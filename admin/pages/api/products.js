import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb', // Adjust the limit as needed
    },
  },
};


export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    // const { title, description, price,img } = req.body;
    // const productDoc = await Product.create({
    //   title,
    //   description,
    //   price,
    //   img
    // })
    // res.json(productDoc);
    try {
      const { title, description, price, img } = req.body;
      const productDoc = await Product.create({
        title,
        description,
        price,
        img,
      });
      res.json(productDoc);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
  if (method === "PUT") {
    const { title, description, price,img, _id } = req.body;
    await Product.updateOne({ _id }, { title, description, price,img });
    res.json(true);
  }

  if(method === 'DELETE') {
    if(req.query?.id){
      await Product.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}