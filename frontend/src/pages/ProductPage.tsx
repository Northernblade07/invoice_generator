import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProduct, generateInvoice, getProducts } from "@/lib/api";
import { ArrowDown, ArrowUp, PlusCircleIcon } from "lucide-react";
import {saveAs} from 'file-saver'
import Eclipse from "@/components/Eclipse";
type Product = {
  _id?: string;
  name: string;
  quantity: number;
  rate: number;
  total?: number;
  gst?: number;
};

export default function ProductPage() {
  const [products, setProduct] = useState<Product>({ name: "", quantity: 0, rate: 0 });

  const queryClient = useQueryClient();

  const { mutate: addProductMutation, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setProduct({ name: "", quantity: 0, rate: 0 });
    },
  });

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const subtotal = allProducts.reduce((acc, item) => acc + (item.total ?? 0), 0);
  const totalWithGST = allProducts.reduce((acc, item) => acc + ((item.total ?? 0) + (item.gst ?? 0)), 0);

  const createProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (products.name && products.quantity && products.rate) {
      addProductMutation(products);
    }
  };

    const handleGeneratePDF = async () => {
    try {
      const pdfBlob = await generateInvoice(allProducts);
      const file = new Blob([pdfBlob], { type: "application/pdf" });
      saveAs(file, `invoice-${Date.now()}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF");
    }
  };


  return (
    <div className="p-10 min-h-screen bg-[#141414] flex flex-col items-center text-white space-y-10">

      {/* Heading */}
      <div className="w-full max-w-[1248px] space-y-2">
        <h2 className="text-5xl font-semibold">Add Products</h2>
        <p className="text-[#A7A7A7]">You can add multiple products for invoice generation.</p>
      </div>

      {/* Form */}
      <div className="w-full max-w-[1248px] grid grid-cols-3 gap-4">
        <div>
          <label className="text-white font-semibold text-md">Product Name</label>
          <Input
            placeholder="Product Name"
            value={products.name}
            className="bg-[#202020] h-[60px] mt-2 rounded-[4px]"
            onChange={(e) => setProduct({ ...products, name: e.target.value })}
          />
        </div>

        <div>
          <label className="text-white font-semibold text-md">Quantity</label>
          <Input
            type="number"
            placeholder="Qty"
            value={products.quantity}
            className="bg-[#202020] h-[60px] mt-2 rounded-[4px]"
            onChange={(e) => setProduct({ ...products, quantity: Number(e.target.value) })}
          />
        </div>

        <div>
          <label className="text-white font-semibold text-md">Rate</label>
          <Input
            type="number"
            placeholder="Rate"
            value={products.rate}
            className="bg-[#202020] h-[60px] mt-2 rounded-[4px]"
            onChange={(e) => setProduct({ ...products, rate: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-[1248px] flex justify-center items-center gap-4">
        <Button onClick={createProduct} className="text-[#CCF575] bg-[#303030]">
          {isPending ? "Adding..." : "Add Product"} <PlusCircleIcon className="ml-2" />
        </Button>
        
      </div>

      {/* Table */}
      <div className="w-full max-w-[1248px] space-y-4">

        <div className="bg-[#202020] rounded-md overflow-hidden">

          {/* Table Header */}
          <div className="flex items-center bg-white text-black text-sm font-semibold px-4 py-3 rounded-t-md gap-10" style={{ height: "45px" }}>
            <div className="w-[25%] flex items-center gap-2">Product Name <span><ArrowUp/></span> </div>
            <div className="w-[25%]">Price</div>
            <div className="w-[25%] flex items-center gap-2">Quantity <span><ArrowDown/></span></div>
            <div className="w-[25%]">Total (₹)</div>
          </div>

          {/* Table Rows */}
          <div className=" max-h-[192px] overflow-y-auto border-2 border-[#3F3F3F] scrollbar-hide">
            {isLoading ? (
              <div className="text-gray-400 px-4 py-2">Loading products...</div>
            ) : allProducts.length === 0 ? (
              <div className="text-gray-400 px-4 py-2">No products added yet.</div>
            ) : (
              allProducts.map((p: Product) => (
                <div key={p._id} className="flex items-center bg-[#141414] text-white border-1 border-[#3F3F3F] text-sm px-4 gap-10 " style={{ height: "45px" }}>
                  <div className="w-[25%] truncate">{p.name}</div>
                  <div className="w-[25%]">{p.quantity}</div>
                  <div className="w-[25%]">₹{p.rate}</div>
                  <div className="w-[25%]">₹{p.total?.toFixed(2)}</div>
                </div>
              ))
            )}
          </div>

          {/* Subtotal Row */}
          <div className="flex items-center border border-[#3F3F3F] justify-end bg-[#141414] text-white text-sm font-semibold px-4 gap-10" style={{ height: "45px" }}>
            <div className="flex-1"></div>
            <div className="w-[15%]">Subtotal:</div>
            <div className="w-[22.5%] text-start">₹{subtotal.toFixed(2)}</div>
          </div>

          {/* Total with GST Row */}
          <div className="flex items-center justify-end bg-[#141414] text-white text-sm font-semibold px-4 gap-10 border border-[#3F3F3F]" style={{ height: "45px" }}>
            <div className="flex-1"></div>
            <div className="w-[15%]">Including GST:</div>
            <div className="w-[22.5%] text-start">₹{totalWithGST.toFixed(2)}</div>
          </div>

        </div>
      </div>

<Button
          variant="secondary"
          className="text-[#CCF575] bg-[#303030] text-lg w-[435px]"
          onClick={handleGeneratePDF}
        >
        Generate PDF invoice
        </Button>

         <Eclipse color='#4F59A8' blur='200px' className={'absolute  h-57 rotate-90 w-59  top-0 text-center z-10'} />
    </div>
  );
}
