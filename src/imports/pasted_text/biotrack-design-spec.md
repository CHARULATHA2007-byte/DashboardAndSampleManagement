Design a modern, professional **desktop web application UI/UX** called **“BioTrack – Biobank Management System”**.

### Project Purpose

BioTrack is a digital platform used by biobanks to manage thousands of biological samples such as blood, tissue, DNA, and plasma. The system helps staff track samples, manage storage locations, monitor storage conditions, retrieve samples, and maintain complete chain-of-custody records.

### Design Style

Create a **modern biotechnology + laboratory management dashboard**.

Use:

* Clean professional layout
* Light background
* White cards
* Blue/teal scientific accent colors
* Dark navy text
* Subtle shadows
* Rounded corners
* Clear typography
* Minimal but professional icons
* Plenty of whitespace

The design should look like a **real enterprise SaaS product**, not a generic hospital website.

### Main Layout

Create a fixed **left sidebar navigation** with the BioTrack logo and:

* Dashboard
* Samples
* Storage
* Monitoring
* Retrieval
* Chain of Custody
* Alerts
* Reports
* Users
* Settings

At the bottom of the sidebar show the logged-in user's profile.

Create a **top navigation bar** containing:

* Global search
* Notifications icon
* User profile
* Role indicator

---

### 1. Login Screen

Design a professional login page.

Include:

* BioTrack logo
* “Biobank Management System”
* Email field
* Password field
* Remember me
* Forgot password
* Login button

Add a subtle biotechnology/laboratory visual on one side.

---

### 2. Dashboard

Create a detailed dashboard showing:

#### Statistics Cards

* Total Samples
* Available Samples
* Samples in Storage
* Pending Retrievals
* Storage Capacity
* Active Alerts

Each card should include:

* Icon
* Large number
* Small description
* Trend indicator

#### Charts

Create:

* Sample Distribution by Type – donut chart
* Sample Collection Trend – line chart
* Storage Utilization – bar chart

#### Recent Activity

Create a table/timeline showing:

* Sample ID
* Action
* User
* Date & Time
* Status

#### Alerts Section

Show important storage alerts such as:

* Temperature warning
* Storage nearly full
* Sample expiry

---

### 3. Sample Management Page

Create a professional sample inventory page.

Top section:

* Page title: “Sample Management”
* Add Sample button
* Search Sample field
* Filter button
* Export button

Create a data table with:

| Sample ID | Sample Type | Collection Date | Storage Location | Status | Custodian | Actions |

Use realistic sample IDs such as:

* BIO-1001
* BIO-1002
* BIO-1003
* BIO-1004

Status should use clear badges:

* Available
* Stored
* Processing
* Retrieved
* Expired

---

### 4. Add Sample Screen

Create a clean form for adding a biological sample.

Fields:

* Sample ID
* Sample Type
* Donor/Source ID
* Collection Date
* Received Date
* Storage Temperature
* Storage Location
* Quantity/Volume
* Department
* Notes

Buttons:

* Save Sample
* Cancel

Use clear form sections and validation states.

---

### 5. Sample Details Screen

Create a detailed sample profile.

Show:

**Sample Information**

* Sample ID
* Sample Type
* Status
* Collection Date
* Received Date
* Quantity

**Storage Information**

* Freezer
* Rack
* Box
* Position
* Temperature

**Current Custodian**

Below this, create a **Sample History Timeline** showing:

* Sample collected
* Sample received
* Sample stored
* Sample transferred
* Sample retrieved

Each timeline event should show user, date, time, and action.

---

### 6. Storage Management

Create a storage visualization page.

Show storage units such as:

**Freezer 01**

* Temperature
* Total Capacity
* Occupied
* Available
* Status

Inside each freezer show:

Freezer → Rack → Box → Position

Use a visual grid to represent storage positions.

Use different status indicators for:

* Occupied
* Available
* Reserved
* Maintenance

---

### 7. Storage Monitoring

Create a monitoring dashboard.

Display:

* Current Temperature
* Minimum Temperature
* Maximum Temperature
* Temperature Trend
* Storage Status

Create temperature charts for different freezers.

Add alert cards for abnormal temperatures.

Example:
“Freezer 02 temperature is outside the configured range.”

---

### 8. Sample Retrieval Page

Create a sample retrieval interface.

Top:

* Search Sample ID
* Search button

Show sample location as a visual path:

**BIO-1025**
↓
**Freezer 02**
↓
**Rack 04**
↓
**Box 12**
↓
**Position C7**

Add:

* Request Retrieval button
* Sample status
* Current custodian

Create a table below for pending retrieval requests.

---

### 9. Chain of Custody Page

Create a professional audit/history interface.

Show a sample's complete movement history as a vertical timeline.

Example:

**Collected**
→ **Received**
→ **Stored**
→ **Transferred**
→ **Retrieved**
→ **Returned**

Each event should contain:

* User
* Date
* Time
* Action
* Previous location
* New location
* Reason

Use a clean timeline design emphasizing traceability and accountability.

---

### 10. Alerts Page

Create an alerts dashboard.

Categories:

* Critical
* Warning
* Information

Example alerts:

* Freezer temperature abnormal
* Storage capacity almost full
* Sample expiry approaching
* Retrieval request pending

Each alert should have:

* Alert icon
* Description
* Date/time
* Status
* View Details button

---

### 11. Reports Page

Create a professional analytics page.

Include:

* Total Samples
* Samples by Type
* Storage Utilization
* Retrieval Statistics
* Sample Movement
* Expired Samples

Add:

* Date filter
* Sample type filter
* Export Report button

Use charts, graphs, and summary cards.

---

### 12. User Management

Create an admin user management page.

Table columns:

* User
* Email
* Role
* Department
* Status
* Last Active
* Actions

Roles:

* Admin
* Biobank Staff
* Researcher

Add:

* Add User button
* Search
* Filter
* Edit/Delete actions

---

### Figma Design System

Create reusable components for:

* Sidebar
* Navbar
* Buttons
* Input fields
* Dropdowns
* Search bars
* Cards
* Tables
* Status badges
* Alerts
* Modal dialogs
* Charts
* Timeline
* Pagination
* Tabs

Create component variants for:

* Default
* Hover
* Active
* Disabled
* Error
* Success

### Responsive Design

Design the application primarily for **desktop 1440px width**, while also creating responsive layouts for tablet and mobile.

### Prototype

Connect the main screens with clickable prototype interactions:

Login → Dashboard

Dashboard → Samples

Samples → Sample Details

Sample Details → Chain of Custody

Storage → Storage Details

Retrieval → Retrieval Request

Alerts → Alert Details

Reports → Reports Dashboard

Use smooth and professional transitions.

### Overall Goal

The final Figma design should look like a **real-world enterprise biobank inventory and sample tracking platform** used by laboratories, research institutions, hospitals, and biotechnology organizations.

Project Name: **BioTrack**

Tagline: **“Track. Store. Retrieve. Secure.”**
