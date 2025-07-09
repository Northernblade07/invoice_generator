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
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const currentDate = new Date().toLocaleDateString();

  // Build the invoice HTML
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Invoice</h1>
        <p><strong>Customer:</strong> ${user.name} (${user.email})</p>
        <p><strong>Date:</strong> ${currentDate}</p>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Total</th>
              <th>GST (18%)</th>
            </tr>
          </thead>
          <tbody>
            ${products.map((p, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${p.name}</td>
                <td>${p.quantity}</td>
                <td>${p.rate}</td>
                <td>${p.total}</td>
                <td>${p.gst}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

 await page.setContent(html, { waitUntil: 'networkidle0' });
const pdfUint8Array = await page.pdf({ format: 'A4' });

await browser.close();

const pdfBuffer = Buffer.from(pdfUint8Array);
return pdfBuffer;

};
