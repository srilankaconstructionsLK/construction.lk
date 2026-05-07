# Construction.lk: Strategic Industry Guide & Feature Roadmap

This document outlines the strategic direction for transforming a general business directory into a high-performance, industry-leading construction portal for the Sri Lankan market.

---

## 1. The Sri Lankan Industry Context
To succeed, the platform must cater to the specific standards used in Sri Lanka:
*   **CIDA Grading (Primary Trust Factor):** Contractors are graded from **CS2 (highest)** to **C9 (lowest)** by the Construction Industry Development Authority. This is the first thing clients look for.
*   **Specializations:** Construction is categorized into Building, Highways, Bridges, Water Supply & Drainage, etc.
*   **Professional Stack:** A construction project follows a specific workflow: Architect $\rightarrow$ Structural Engineer $\rightarrow$ Quantity Surveyor $\rightarrow$ Contractor. The site should support all these roles.

---

## 2. Why a Specialized Portal?
| Feature | General Directory (`srilankabusiness.lk`) | Construction Portal (`construction.lk`) |
| :--- | :--- | :--- |
| **Verification** | Basic (Phone/Email) | **CIDA Grading & BR Verification** |
| **Search** | Name/Category | **Project Scale & Specialty Search** |
| **Portfolio** | General Images | **Case Studies (Project Cost, Duration, Role)** |
| **Leads** | Contact Form | **Tender/Inquiry Board (Request for Quote)** |
| **Tools** | None | **Material Cost Calculators / BoQ Templates** |

---

## 3. Essential Feature Roadmap

### A. For Clients (Homeowners/Developers)
*   **Trust Badges:** Visual indicators for "CIDA Verified," "VAT Registered," and "Top Rated."
*   **Advanced Filter Engine:** Filter by District, Budget Range, and CIDA Grade.
*   **Request for Quote (RFQ) System:** A multi-step form to match clients with suitable contractors.
*   **Find Professionals:** Dedicated sections for Architects, Interior Designers, and MEP Engineers.

### B. For Professionals & Contractors
*   **Structured Portfolios:** Portfolios containing Project Location, Type (Commercial/Residential), and Year.
*   **Lead Dashboard:** A private area to view and respond to incoming "Request for Quotes."
*   **Job Board:** Post requirements for site supervisors, masons, or specialized labor.

### C. For Material Suppliers
*   **Material Marketplace:** A directory for Cement, Steel, Tiles, and Timber suppliers.
*   **Daily Material Prices:** A high-traffic feature showing current market prices for essential materials (Steel per ton, Cement per bag).

---

## 4. Technical Specializations for Success

### 1. The "Verified" Workflow
Manual or semi-automated verification of CIDA certificates and Business Registrations (BR). Verified profiles should get priority in search.

### 2. Location-Based Lead Matching
Matching contractors with leads specifically within their `service_districts`.

### 3. Smart Category Mapping
Hierarchical categories including:
*   **Construction Services:** General Contractors, Piling, Waterproofing.
*   **Professional Services:** Architects, QS, Structural Engineers.
*   **Machinery Rental:** Excavators, Cranes, Scaffolding.
*   **Materials:** Hardware stores, Tile showrooms.

---

## 5. Database Schema Recommendations

The `business_profiles` table should include these construction-specific columns:
*   `br_number` (text): For legal verification.
*   `cida_grading` (text): e.g., 'C1', 'C2', 'C3'.
*   `cida_specialties` (text[]): Array of specialty areas.
*   `service_districts` (text[]): Districts where the company operates.
*   `project_portfolio` (jsonb): Structured history of completed projects.
*   `is_vat_registered` (boolean): Critical for corporate B2B clients.

---

## 6. Monetization Strategy
1.  **Subscription Plans:** Tiered access (Basic, Pro, Enterprise).
2.  **Featured Listings:** Pay for top placement in specific districts or categories.
3.  **Lead Credits:** Pay to unlock contact details of high-value project inquiries.
