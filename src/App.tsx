import { useState, useEffect } from "react";

// Define the product type
type Product = {
  ProductID: string;
  Name: string;
  Design: string;
  Color: string;
  Size: string;
  Material: string;
  Price: number;
};

// Sample initial data
const initialProducts: Product[] = [
  { ProductID: "P001", Name: "T-Shirt", Design: "Graphic", Color: "Red", Size: "M", Material: "Cotton", Price: 500 },
  { ProductID: "P002", Name: "Jeans", Design: "Slim Fit", Color: "Blue", Size: "L", Material: "Denim", Price: 1200 },
];

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formProduct, setFormProduct] = useState<Product>({
    ProductID: "",
    Name: "",
    Design: "",
    Color: "",
    Size: "",
    Material: "",
    Price: 0,
  });

  useEffect(() => {
    if (editingProduct) {
      setFormProduct(editingProduct);
    } else {
      setFormProduct({ ProductID: "", Name: "", Design: "", Color: "", Size: "", Material: "", Price: 0 });
    }
  }, [editingProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormProduct({ ...formProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProduct.ProductID) return alert("Product ID is required!");

    if (editingProduct) {
      setProducts(products.map((p) => (p.ProductID === formProduct.ProductID ? formProduct : p)));
    } else {
      setProducts([...products, formProduct]);
    }

    setEditingProduct(null);
    setFormProduct({ ProductID: "", Name: "", Design: "", Color: "", Size: "", Material: "", Price: 0 });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((product) => product.ProductID !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">NeoFit</h1>

        {/* Form for adding/editing products */}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
          <input name="ProductID" value={formProduct.ProductID} onChange={handleChange} placeholder="Product ID" className="input-field" required />
          <input name="Name" value={formProduct.Name} onChange={handleChange} placeholder="Name" className="input-field" required />
          <input name="Design" value={formProduct.Design} onChange={handleChange} placeholder="Design" className="input-field" required />
          <input name="Color" value={formProduct.Color} onChange={handleChange} placeholder="Color" className="input-field" required />
          <input name="Size" value={formProduct.Size} onChange={handleChange} placeholder="Size" className="input-field" required />
          <input name="Material" value={formProduct.Material} onChange={handleChange} placeholder="Material" className="input-field" required />
          <input name="Price" type="number" value={formProduct.Price} onChange={handleChange} placeholder="Price" className="input-field" required />
          <button type="submit" className="col-span-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-800">
                <th className="table-header">Product ID</th>
                <th className="table-header">Name</th>
                <th className="table-header">Design</th>
                <th className="table-header">Color</th>
                <th className="table-header">Size</th>
                <th className="table-header">Material</th>
                <th className="table-header">Price</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.ProductID} className="bg-white border-b hover:bg-gray-100 transition">
                  <td className="table-cell">{product.ProductID}</td>
                  <td className="table-cell">{product.Name}</td>
                  <td className="table-cell">{product.Design}</td>
                  <td className="table-cell">{product.Color}</td>
                  <td className="table-cell">{product.Size}</td>
                  <td className="table-cell">{product.Material}</td>
                  <td className="table-cell">{product.Price}</td>
                  <td className="table-cell">
                    <button className="btn-edit" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(product.ProductID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tailwind Utility Styles */}
      <style>{`
        .input-field {
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 6px;
          outline: none;
          width: 100%;
        }
        .table-header {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
          font-weight: bold;
        }
        .table-cell {
          padding: 10px;
          border: 1px solid #ddd;
        }
        .btn-edit {
          background-color: #3b82f6;
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
          margin-right: 5px;
          transition: 0.2s;
        }
        .btn-edit:hover {
          background-color: #2563eb;
        }
        .btn-delete {
          background-color: #ef4444;
          color: white;
          padding: 5px 10px;
          border-radius: 6px;
          transition: 0.2s;
        }
        .btn-delete:hover {
          background-color: #dc2626;
        }
      `}</style>
    </div>
  );
}

export default App;
