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
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const currentDate = new Date().toLocaleDateString('en-GB');
  const subtotal = products.reduce((sum, p) => sum + p.total, 0);
  const gstTotal = products.reduce((sum, p) => sum + p.gst, 0);
  const grandTotal = +(subtotal + gstTotal).toFixed(2);

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice Template</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #fff;
        color: #000;
        margin: 0;
        padding: 40px;
      }

      .invoice-container {
        /* border: 2px solid #000; */
        border-radius: 12px;
        padding: 20px;
        max-width: 800px;
        margin: auto;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .logo {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .logo h1 {
        font-size: 20px;
        font-weight: bold;
        margin: 0;
      }

      .logo span {
        font-size: 10px;
        color: #777;
      }

      .invoice-title {
        text-align: right;
      }

      .invoice-title h2 {
        font-size: 18px;
        font-weight: bold;
        margin: 0;
      }

      .invoice-title p {
        font-size: 10px;
        color: #777;
        margin: 0;
      }

      .user-info {
        /* background: linear-gradient(to right, #101935, #1a4634); */
         background: linear-gradient(90deg, #1D1E4E,#0F0F0F);
        color: #fff;
        padding: 16px 20px;
        border-radius: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
      }

      .user-info h3 {
        margin: 0;
        font-size: 20px;
        color: #a3ff84;
      }

      .user-info .email {
        background: #fff;
        color: #000;
        border-radius: 20px;
        padding: 4px 12px;
        font-size: 12px;
      }

      table {
        width: 100%;
        border-collapse: separate;
        margin-top: 10px;
        border-spacing:0 10px;
        /* border-radius: 12px; */
        overflow: hidden;
      }

      thead {
        /* background: linear-gradient(to right, #101935, #1a4634) */
         background: linear-gradient(90deg, #1D1E4E, #304D30);
        color: #fff;
        font-size: 12px;
        border-radius: 50px;
      }

      th, td {
        padding: 10px 12px;
        text-align: left;
        font-size: 12px;
        overflow: hidden;
      }

      tbody tr:nth-child(even) {
        background: #f7f7f7;
      }

      tbody tr:nth-child(odd) {
        background: #fff;
      }

      .summary {
        margin-top: 30px;
        display: flex;
        justify-content: flex-end;
      }

      .summary-box {
        border: 1px solid #ccc;
        border-radius: 12px;
        padding: 16px;
        width: 200px;
        font-size: 12px;
      }

      .summary-box div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .summary-box .total {
        font-weight: bold;
        font-size: 14px;
      }

      .footer {
        margin-top: 40px;
        text-align: center;
        font-size: 10px;
      }

      .footer-box {
        display: inline-block;
        background: #1c1c28;
        color: #fff;
        padding: 12px 20px;
        border-radius: 30px;
        max-width: 600px;
      }

      .date-bottom {
        font-size: 10px;
        margin-top: 20px;
      }
         .user-name {
          font-size: 20px;
          color: #CCF575;
          font-weight: bold;
          margin-top:10px;
        }

 thead tr th:first-child {
        border-top-left-radius: 999px;
        border-bottom-left-radius: 999px;
      }

      thead tr th:last-child {
        border-top-right-radius: 999px;
        border-bottom-right-radius: 999px;
      }

        tbody tr td:first-child {
        border-top-left-radius: 999px;
        border-bottom-left-radius: 999px;
      }

      tbody tr td:last-child {
        border-top-right-radius: 999px;
        border-bottom-right-radius: 999px;
      }

      .logo {
        position: relative;
        width: 35px;
        height: 35px;
      }

      .hex {
        width: 100%;
        height: 100%;
        background-color: black;
        clip-path: polygon(
          25% 0%,
          75% 0%,
          100% 50%,
          75% 100%,
          25% 100%,
          0% 50%
        );
        position: absolute;
        top: 0;
        left: 0;
      }

      .code-brackets {
        position: absolute;
        top: 4px;
        left: 7px;
        width: 21px;
        height: 27px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .code-brackets svg {
        width: 10px;
        height: 20px;
        fill: white;
      }


    </style>
  </head>
  <body>
    <div class="invoice-container">
      <div class="header" style="border-bottom: 1px solid #EAEAEA; padding: 10px">
        <div class="logo" style="display: flex; flex-direction: row; align-items: center; gap: 5px;">
            <div style="height: 35px; width: 35px;">
                <div class="logo">
      <div class="hex"></div>
      <div class="code-brackets">
        <svg viewBox="0 0 9 20">
          <polyline points="10,0 0,10 8,20" stroke="white" stroke-width="2" fill="none" />
        </svg>
        <svg viewBox="2 0 9 20">
          <polyline points="2,0 10,10 2,20" stroke="white" stroke-width="2" fill="none" />
        </svg>
      </div>
    </div>
            </div>
          <div>
              <h1>Levitation</h1>
              <span>Infotech</span>
            </div>
        </div>
        <div class="invoice-title">
          <h2>INVOICE GENERATOR</h2>
          <p>Sample Output should be this</p>
        </div>
      </div>

      <div class="user-info">
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div style="font-size:10px;">Name</div>
          <div class="user-name">${user.name}</div>
        </div>
        <div style="text-align: right; display: flex; flex-direction: column; gap: 10px;">
          <div style="font-size: 10px;">Date: ${currentDate}</div>
          <div class="user-email">${user.email}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr class="table-row">
            <th>Product</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-row">
            <td>{Product 1}</td>
            <td>32</td>
            <td>120</td>
            <td>USD 100</td>
          </tr>
          <tr>
            <td>{Product 2}</td>
            <td>32</td>
            <td>120</td>
            <td>USD 100</td>
          </tr>
          <tr>
            <td>{Product 3}</td>
            <td>32</td>
            <td>120</td>
            <td>USD 100</td>
          </tr>
          <tr>
            <td>{Product 4}</td>
            <td>32</td>
            <td>120</td>
            <td>USD 100</td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <div class="summary-box">
          <div>
            <span>Total Charges</span>
            <span>$400</span>
          </div>
          <div>
            <span>GST (18%)</span>
            <span>$72</span>
          </div>
          <div class="total">
            <span>Total Amount</span>
            <span style="color:#0046be;">₹ 472</span>
          </div>
        </div>
      </div>

      <div class="date-bottom">Date: 12/04/23</div>

      <div class="footer">
        <div class="footer-box">
          We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.
        </div>
      </div>

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


// await page.setContent(html, { waitUntil: 'networkidle0' });
// // const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

// await browser.close();


// return pdfBuffer;