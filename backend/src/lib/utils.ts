import puppeteer from 'puppeteer';

interface Product {
  name: string;
  quantity: number;
  rate: number;
  total: number;
  gst: number;
}

interface User {
  name: string;
  email: string;
}

export const generatePDFBuffer = async (products: Product[], user: User): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Important for deployment (Render, Vercel, etc.)
  });
  const page = await browser.newPage();

  const currentDate = new Date().toLocaleDateString();

  const subtotal = products.reduce((sum, p) => sum + p.total, 0);
  const gstTotal = products.reduce((sum, p) => sum + p.gst, 0);
  const grandTotal = +(subtotal + gstTotal).toFixed(2);

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; background: #f9f9f9; }
          h1 { text-align: center; margin-bottom: 10px; }
          p { margin: 4px 0; }
          .invoice-box {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
          }
          th {
            background: #f0f0f0;
            color: #333;
            font-weight: bold;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
          }
          tfoot td {
            font-weight: bold;
            background: #fafafa;
          }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <h1>Invoice</h1>
          <p><strong>Customer:</strong> ${user.name} (${user.email})</p>
          <p><strong>Date:</strong> ${currentDate}</p>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Rate (₹)</th>
                <th>Total (₹)</th>
                <th>GST (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${products.map((p, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${p.name}</td>
                  <td>${p.quantity}</td>
                  <td>${p.rate.toFixed(2)}</td>
                  <td>${p.total.toFixed(2)}</td>
                  <td>${p.gst.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4"></td>
                <td>Subtotal:</td>
                <td>₹${subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td>GST (18%):</td>
                <td>₹${gstTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="4"></td>
                <td>Grand Total:</td>
                <td>₹${grandTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  // const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  const pdfBuffer = Buffer.from(await page.pdf({ format: 'A4', printBackground: true }));

  await browser.close();


  return pdfBuffer;
};
