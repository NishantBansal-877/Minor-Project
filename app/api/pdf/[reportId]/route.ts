// ======================================================
// FILE: /src/app/api/reports/[reportId]/pdf/route.ts
// ======================================================

import { NextRequest, NextResponse } from "next/server";

import puppeteer from "puppeteer";

import { eq } from "drizzle-orm";

import { PANEL_GROUP_MAP, PANEL_REGISTRY } from "@/lib/utils";

import { buildReportRows } from "@/lib/report-utils";

import { db } from "@/config/drizzle/db";

import { reports, users } from "@/drizzle/schema";

// ======================================================
// GET PDF
// ======================================================

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ reportId: string }>;
  },
) {
  try {
    const { reportId } = await params;

    // ======================================================
    // FETCH REPORT
    // ======================================================

    const [report] = await db
      .select()
      .from(reports)
      .where(eq(reports.id, Number(reportId)));

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          message: "Report not found",
        },
        {
          status: 404,
        },
      );
    }

    // ======================================================
    // FETCH PATIENT
    // ======================================================

    const [patient] = await db
      .select()
      .from(users)
      .where(eq(users.userId, report.patientId));

    if (!patient) {
      return NextResponse.json(
        {
          success: false,
          message: "Patient not found",
        },
        {
          status: 404,
        },
      );
    }

    // ======================================================
    // PANEL GROUP
    // ======================================================

    let panelKey = report.panelKey;

    const groupKey = PANEL_GROUP_MAP[panelKey];

    if (!groupKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Panel group not found",
        },
        {
          status: 400,
        },
      );
    }

    // ======================================================
    // PANEL IMPORT
    // ======================================================

    panelKey = panelKey.replaceAll("_", "-");

    const importer = PANEL_REGISTRY[groupKey]?.[panelKey];

    if (!importer) {
      return NextResponse.json(
        {
          success: false,
          message: "Panel importer not found",
        },
        {
          status: 400,
        },
      );
    }

    // ======================================================
    // IMPORT PANEL
    // ======================================================

    const module = await importer();

    const panel =
      module.default ||
      module[panelKey.toUpperCase()] ||
      Object.values(module)[0];

    if (!panel) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid panel module",
        },
        {
          status: 400,
        },
      );
    }

    // ======================================================
    // BUILD REPORT ROWS
    // ======================================================

    const rows = buildReportRows({
      tests: panel.tests,
      values: report.values!,
      gender: patient.gender,
    });

    // ======================================================
    // HTML
    // ======================================================

    const html = generateReportHTML({
      report,
      patient,
      panel,
      rows,
    });

    // ======================================================
    // PDF GENERATION
    // ======================================================

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    await browser.close();

    // ======================================================
    // FILE NAME
    // ======================================================

    const safePanelName = panel.title
      ?.replace(/[^a-zA-Z0-9]/g, "_")
      ?.replace(/_+/g, "_")
      ?.toLowerCase();

    const safePatientId = String(report.patientId);

    const date = new Date().toISOString().split("T")[0];

    const fileName = `${safePanelName}_${safePatientId}_${date}.pdf`;

    // ======================================================
    // RESPONSE
    // ======================================================
    return new NextResponse(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate PDF",
      },
      {
        status: 500,
      },
    );
  }
}

// ======================================================
// FORMAT REFERENCE
// ======================================================

const formatReference = (reference: any) => {
  if (!reference) return "-";

  const ref = String(reference).trim();

  /*
    Matches:
    4.5 - 4.5
    4.5 – 4.5
    4.5 — 4.5
  */

  const match = ref.match(/^([0-9.]+)\s*[-–—]\s*([0-9.]+)$/i);

  if (!match) {
    return ref;
  }

  const min = match[1];

  const max = match[2];

  if (min === max) {
    return min;
  }

  return ref;
};

// ======================================================
// HTML GENERATOR
// ======================================================

function generateReportHTML({ report, patient, panel, rows }: any) {
  return `
<!DOCTYPE html>
<html>

<head>

<meta charset="utf-8" />

<style>

body{
  font-family: Arial, sans-serif;
  padding:20px;
  color:#111;
}

.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-bottom:2px solid #000;
  padding-bottom:12px;
  margin-bottom:20px;
}

.lab-name{
  font-size:28px;
  font-weight:bold;
}

.section{
  margin-top:20px;
}

.patient-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:10px;
}

.label{
  font-weight:bold;
}

.title{
  font-size:24px;
  font-weight:bold;
  margin-top:20px;
  margin-bottom:10px;
}

table{
  width:100%;
  border-collapse:collapse;
  margin-top:10px;
}

th{
  background:#111;
  color:white;
  padding:10px;
  text-align:left;
  font-size:13px;
}

td{
  border:1px solid #ddd;
  padding:10px;
  font-size:12px;
}

.high{
  color:red;
  font-weight:bold;
}

.low{
  color:orange;
  font-weight:bold;
}

.normal{
  color:green;
  font-weight:bold;
}

.abnormal{
  color:red;
  font-weight:bold;
}

.footer{
  margin-top:40px;
  border-top:1px solid #ddd;
  padding-top:10px;
  font-size:12px;
  color:#666;
}

</style>

</head>

<body>

<!-- HEADER -->

<div class="header">

  <div>
    <div class="lab-name">
      LIS
    </div>

    <div>
      Laboratory Information System
    </div>
  </div>

  <div>
    <div>
      <strong>Report ID:</strong> ${report.id}
    </div>

    <div>
      ${new Date(report.createdAt).toLocaleString()}
    </div>
  </div>

</div>

<!-- PANEL -->

<div class="section">

  <div class="title">
    ${panel.title}
  </div>

  <div class="patient-grid">

    <div>
      <span class="label">Patient ID:</span>
      ${report.patientId}
    </div>

    <div>
      <span class="label">Patient Name:</span>
      ${patient.name || "-"}
    </div>

    <div>
      <span class="label">Gender:</span>
      ${patient.gender || "-"}
    </div>

    <div>
      <span class="label">Specimen:</span>
      ${panel.specimenType || "-"}
    </div>

  </div>

</div>

<!-- TABLE -->

<div class="section">

<table>

<thead>
<tr>
<th>Parameter</th>
<th>Value</th>
<th>Unit</th>
<th>Reference</th>
<th>Status</th>
</tr>
</thead>

<tbody>

${rows
  .map(
    (row: any) => `
<tr>

<td>
  ${row.name}
</td>

<td class="${row.status}">
  ${row.value ?? "-"}
</td>

<td>
  ${row.unit || "-"}
</td>

<td>
  ${formatReference(row.reference)}
</td>

<td class="${row.status}">
  ${(row.status || "normal").toUpperCase()}
</td>

</tr>
`,
  )
  .join("")}

</tbody>

</table>

</div>

<!-- FOOTER -->

<div class="footer">

<div>
All results require clinical correlation.
</div>

<div>
Generated by LIS
</div>

</div>

</body>

</html>
`;
}
