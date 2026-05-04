---
name: invoice-organizer
description: Automatically organizes invoices and receipts for tax preparation by reading messy files, extracting key information, renaming them consistently, and sorting them into logical folders. Turns hours of manual bookkeeping into minutes of automated organization.
---

# Invoice Organizer

This skill transforms chaotic folders of invoices, receipts, and financial documents into a clean, tax-ready filing system without manual effort.

## When to Use This Skill

1. Preparing for tax season and need organized records

1. Managing business expenses across multiple vendors

1. Organizing receipts from a messy folder or email downloads

1. Setting up automated invoice filing for ongoing bookkeeping

1. Archiving financial records by year or category

1. Reconciling expenses for reimbursement

1. Preparing documentation for accountants

## What This Skill Does

1. **Reads Invoice Content**: Extracts information from PDFs, images, and documents:
1. Vendor/company name
1. Invoice number
1. Date
1. Amount
1. Product or service description
1. Payment method

1. **Renames Files Consistently**: Creates standardized filenames:
1. Format: `YYYY-MM-DD Vendor - Invoice - ProductOrService.pdf`

1. Examples: `2024-03-15 Adobe - Invoice - Creative Cloud.pdf`

1. **Organizes by Category**: Sorts into logical folders:
1. By vendor
1. By expense category (software, office, travel, etc.)
1. By time period (year, quarter, month)
1. By tax category (deductible, personal, etc.)

1. **Handles Multiple Formats**: Works with:
1. PDF invoices
1. Scanned receipts (JPG, PNG)
1. Email attachments
1. Screenshots
1. Bank statements

1. **Maintains Originals**: Preserves original files while organizing copies

## How to Use

### Basic Usage

Navigate to your messy invoice folder:

```text
cd ~/Desktop/receipts-to-sort
```

Then ask Claude Code:

```text
Organize these invoices for taxes
```

Or more specifically:

```text
Read all invoices in this folder, rename them to
"YYYY-MM-DD Vendor - Invoice - Product.pdf" format,
and organize them by vendor
```

### Advanced Organization

```text
Organize these invoices:
1. Extract date, vendor, and description from each file
2. Rename to standard format
3. Sort into folders by expense category (Software, Office, Travel, etc.)
4. Create a CSV spreadsheet with all invoice details for my accountant
```

## Instructions

When a user requests invoice organization:

1. **Scan the Folder**

   Identify all invoice files:

```bash
## Find all invoice-related files
   find . -type f \( -name "*.pdf" -o -name "*.jpg" -o -name "*.png" \) -print
```

   Report findings:

1. Total number of files
1. File types
1. Date range (if discernible from names)
1. Current organization (or lack thereof)

1. **Extract Information from Each File**

   For each invoice, extract:

   **From PDF invoices**:

1. Use text extraction to read invoice content
1. Look for common patterns:
   1. "Invoice Date:", "Date:", "Issued:"
   1. "Invoice #:", "Invoice Number:"
   1. Company name (usually at top)
   1. "Amount Due:", "Total:", "Amount:"
   1. "Description:", "Service:", "Product:"

   **From image receipts**:

1. Read visible text from images
1. Identify vendor name (often at top)
1. Look for date (common formats)
1. Find total amount

   **Fallback for unclear files**:

1. Use filename clues
1. Check file creation/modification date
1. Flag for manual review if critical info missing

1. **Determine Organization Strategy**

   Ask user preference if not specified:

```markdown
   I found [X] invoices from [date range].
   How would you like them organized?

   1. **By Vendor** (Adobe/, Amazon/, Stripe/, etc.)
   1. **By Category** (Software/, Office Supplies/, Travel/, etc.)
   1. **By Date** (2024/Q1/, 2024/Q2/, etc.)
   1. **By Tax Category** (Deductible/, Personal/, etc.)
   1. **Custom** (describe your structure)

   Or I can use a default structure: Year/Category/Vendor
```

1. **Create Standardized Filename**

   For each invoice, create a filename following this pattern:

```text
   YYYY-MM-DD Vendor - Invoice - Description.ext
```

   Examples:

1. `2024-03-15 Adobe - Invoice - Creative Cloud.pdf`

1. `2024-01-10 Amazon - Receipt - Office Supplies.pdf`

1. `2023-12-01 Stripe - Invoice - Monthly Payment Processing.pdf`

   **Filename Best Practices**:

1. Remove special characters except hyphens
1. Capitalize vendor names properly
1. Keep descriptions concise but meaningful
1. Use consistent date format (YYYY-MM-DD) for sorting
1. Preserve original file extension

1. **Execute Organization**

   Before moving files, show the plan:

```markdown
## Organization Plan
## Proposed Structure
```

   Invoices/
   ├── 2023/
   │   ├── Software/
   │   │   ├── Adobe/
   │   │   └── Microsoft/
   │   ├── Services/
   │   └── Office/
   └── 2024/
       ├── Software/
       ├── Services/
       └── Office/

```text
## Sample Changes
   Before: `invoice_adobe_march.pdf`
   After: `2024-03-15 Adobe - Invoice - Creative Cloud.pdf`
   Location: `Invoices/2024/Software/Adobe/`
   Before: `IMG_2847.jpg`
   After: `2024-02-10 Staples - Receipt - Office Supplies.jpg`
   Location: `Invoices/2024/Office/Staples/`
   Process [X] files? (yes/no)
```

   After approval:

```bash
## Create folder structure
   mkdir -p "Invoices/2024/Software/Adobe"
## Copy (don't move) to preserve originals
   cp "original.pdf" "Invoices/2024/Software/Adobe/2024-03-15 Adobe - Invoice - Creative Cloud.pdf"
## Or move if user prefers
   mv "original.pdf" "new/path/standardized-name.pdf"
```

1. **Generate Summary Report**

   Create a CSV file with all invoice details:

```csv
   Date,Vendor,Invoice Number,Description,Amount,Category,File Path
   2024-03-15,Adobe,INV-12345,Creative Cloud,52.99,Software,Invoices/2024/Software/Adobe/2024-03-15 Adobe - Invoice - Creative Cloud.pdf
   2024-03-10,Amazon,123-4567890-1234567,Office Supplies,127.45,Office,Invoices/2024/Office/Amazon/2024-03-10 Amazon - Receipt - Office Supplies.pdf
   ...
```

   This CSV is useful for:

1. Importing into accounting software
1. Sharing with accountants
1. Expense tracking and reporting
1. Tax preparation

1. **Provide Completion Summary**

```markdown
## Organization Complete! 📊
## Summary

   - **Processed**: [X] invoices
   - **Date range**: [earliest] to [latest]
   - **Total amount**: $[sum] (if amounts extracted)
   - **Vendors**: [Y] unique vendors

## New Structure
```

   Invoices/
   ├── 2024/ (45 files)
   │   ├── Software/ (23 files)
   │   ├── Services/ (12 files)
   │   └── Office/ (10 files)
   └── 2023/ (12 files)

```text
## Files Created

   - `/Invoices/` - Organized invoices
   - `/Invoices/invoice-summary.csv` - Spreadsheet for accounting
   - `/Invoices/originals/` - Original files (if copied)

## Files Needing Review
   [List any files where information couldn't be extracted completely]
## Next Steps

   1. Review the `invoice-summary.csv` file
   1. Check files in "Needs Review" folder
   1. Import CSV into your accounting software
   1. Set up auto-organization for future invoices

   Ready for tax season! 🎉
```

## Examples

### Example 1: Tax Preparation (From Martin Merschroth)

**User**: "I have a messy folder of invoices for taxes. Sort them and rename properly."

**Process**:

1. Scans folder: finds 147 PDFs and images

1. Reads each invoice to extract:
1. Date
1. Vendor name
1. Invoice number
1. Product/service description

1. Renames all files: `YYYY-MM-DD Vendor - Invoice - Product.pdf`

1. Organizes into: `2024/Software/`, `2024/Travel/`, etc.

1. Creates `invoice-summary.csv` for accountant

1. Result: Tax-ready organized invoices in minutes

### Example 2: Monthly Expense Reconciliation

**User**: "Organize my business receipts from last month by category."

**Output**:

```markdown
## March 2024 Receipts Organized
## By Category
- Software & Tools: $847.32 (12 invoices)
- Office Supplies: $234.18 (8 receipts)
- Travel & Meals: $1,456.90 (15 receipts)
- Professional Services: $2,500.00 (3 invoices)
Total: $5,038.40
All receipts renamed and filed in:
`Business-Receipts/2024/03-March/[Category]/`
CSV export: `march-2024-expenses.csv`
```

### Example 3: Multi-Year Archive

**User**: "I have 3 years of random invoices. Organize them by year, then by vendor."

**Output**: Creates structure:

```text
Invoices/
├── 2022/
│   ├── Adobe/
│   ├── Amazon/
│   └── ...
├── 2023/
│   ├── Adobe/
│   ├── Amazon/
│   └── ...
└── 2024/
    ├── Adobe/
    ├── Amazon/
    └── ...
```

Each file properly renamed with date and description.

### Example 4: Email Downloads Cleanup

**User**: "I download invoices from Gmail. They're all named 'invoice.pdf', 'invoice(1).pdf', etc. Fix this mess."

**Output**:

```markdown
Found 89 files all named "invoice*.pdf"
Reading each file to extract real information...
Renamed examples:
- invoice.pdf → 2024-03-15 Shopify - Invoice - Monthly Subscription.pdf
- invoice(1).pdf → 2024-03-14 Google - Invoice - Workspace.pdf
- invoice(2).pdf → 2024-03-10 Netlify - Invoice - Pro Plan.pdf
All files renamed and organized by vendor.
```

## Common Organization Patterns

### By Vendor (Simple)

```text
Invoices/
├── Adobe/
├── Amazon/
├── Google/
└── Microsoft/
```

### By Year and Category (Tax-Friendly)

```text
Invoices/
├── 2023/
│   ├── Software/
│   ├── Hardware/
│   ├── Services/
│   └── Travel/
└── 2024/
    └── ...
```

### By Quarter (Detailed Tracking)

```text
Invoices/
├── 2024/
│   ├── Q1/
│   │   ├── Software/
│   │   ├── Office/
│   │   └── Travel/
│   └── Q2/
│       └── ...
```

### By Tax Category (Accountant-Ready)

```text
Invoices/
├── Deductible/
│   ├── Software/
│   ├── Office/
│   └── Professional-Services/
├── Partially-Deductible/
│   └── Meals-Travel/
└── Personal/
```

## Automation Setup

For ongoing organization:

```text
Create a script that watches my ~/Downloads/invoices folder
and auto-organizes any new invoice files using our standard
naming and folder structure.
```

This creates a persistent solution that organizes invoices as they arrive.

## Pro Tips

1. **Scan emails to PDF**: Use Preview or similar to save email invoices as PDFs first

1. **Consistent downloads**: Save all invoices to one folder for batch processing

1. **Monthly routine**: Organize invoices monthly, not annually

1. **Backup originals**: Keep original files before reorganizing

1. **Include amounts in CSV**: Useful for budget tracking

1. **Tag by deductibility**: Note which expenses are tax-deductible

1. **Keep receipts 7 years**: Standard audit period

## Handling Special Cases

### Missing Information

If date/vendor can't be extracted:

1. Flag file for manual review

1. Use file modification date as fallback

1. Create "Needs-Review/" folder

### Duplicate Invoices

If same invoice appears multiple times:

1. Compare file hashes

1. Keep highest quality version

1. Note duplicates in summary

### Multi-Page Invoices

For invoices split across files:

1. Merge PDFs if needed

1. Use consistent naming for parts

1. Note in CSV if invoice is split

### Non-Standard Formats

For unusual receipt formats:

1. Extract what's possible

1. Standardize what you can

1. Flag for review if critical info missing

## Related Use Cases

1. Creating expense reports for reimbursement

1. Organizing bank statements

1. Managing vendor contracts

1. Archiving old financial records

1. Preparing for audits

1. Tracking subscription costs over time
