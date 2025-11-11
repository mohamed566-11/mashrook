# RTL UI Audit Report

## Overview
This report documents UI issues identified when switching the application to RTL (Right-to-Left) mode for Arabic language support.

## Issues Found

### 1. Dashboard Page
- **Issue**: Text alignment in cards not properly adjusted for RTL
- **Severity**: Medium
- **Description**: Dashboard summary cards show left-aligned text that should be right-aligned in RTL mode. KPI cards have icons on the right that should be mirrored.

### 2. Navigation Bar
- **Issue**: Navigation items spacing not mirrored
- **Severity**: Low
- **Description**: Space between navigation items should be mirrored in RTL mode. The user avatar and notification dropdown positioning may not be optimal.

### 3. Forms
- **Issue**: Input field text alignment and icon positioning
- **Severity**: Medium
- **Description**: Text in input fields should be right-aligned for Arabic content. Password visibility icons are positioned on the right and should be mirrored. Form labels and placeholders need RTL consideration.

### 4. Tables and Cards
- **Issue**: Column alignment and content positioning not adjusted for RTL
- **Severity**: High
- **Description**: Table headers and data should be right-aligned in RTL mode. Card layouts with left-aligned content and right-aligned scores/metrics need adjustment.

### 5. Icons
- **Issue**: Icon positioning not mirrored
- **Severity**: Medium
- **Description**: Icons positioned on the left (like navigation arrows, calendar icons) should appear on the right in RTL mode. Action buttons with icons need mirroring.

### 6. Modals and Popups
- **Issue**: Modal positioning and content alignment
- **Severity**: Medium
- **Description**: Modals have fixed positioning that may not account for RTL. Content within modals should be right-aligned for Arabic text.

## Technical Issues Identified

### 1. Hardcoded Text
Several components still contain hardcoded text instead of using translation keys:
- UserFormModal.tsx: "Full Name", "Email Address", "Password", "Role", "Cancel", "Create User"/"Update User"
- Dashboard.tsx: "Quick Actions" heading

### 2. Incorrect Translation Key Usage
Some components have translation keys incorrectly placed in HTML attributes:
- UserFormModal.tsx: type attributes have translation keys instead of proper values
- Several components have translation keys in className attributes

### 3. Missing RTL Support Classes
The application is not using Tailwind's RTL support classes that would help with mirroring layouts.

## Recommendations

1. Use Tailwind's RTL support classes (e.g., `rtl:mr-0 rtl:ml-4`)
2. Implement logical properties for margins and padding
3. Adjust flex layouts to use `flex-row-reverse` in RTL mode
4. Ensure proper text alignment for Arabic content
5. Mirror icon positions in RTL mode
6. Replace all hardcoded text with translation keys
7. Fix incorrect translation key usage in HTML attributes
8. Add RTL-specific styling for forms, tables, and navigation

## Next Steps

1. Apply Tailwind RTL plugin
2. Add RTL-specific classes to components
3. Replace hardcoded text with translation keys
4. Fix incorrect translation key usage
5. Test with actual Arabic content
6. Verify all layouts in both LTR and RTL modes

# RTL Audit Scan Results

## Summary
Scanned 41 files with potential RTL issues.

## Detailed Findings

### components\admin\UserFormModal.tsx

#### Hardcoded Text
- Line 2: EyeOff }
- Line 4: UserFormModalProps {
- Line 7: UserFormData)
- Line 16: UserFormData {
- Line 23: UserFormModal:
- Line 23: <UserFormModalProps>
- Line 24: <UserFormData>
- Line 53: .FormEvent)
- Line 57: Validation
- Line 59: 'Name is required'
- Line 63: 'Email is required'
- Line 67: 'Password is required for new users'
- Line 71: 'Password must be at least
- Line 80: 'Failed to save user'
- Line 93: 'Edit User'
- Line 93: 'Add New User'
- Line 99: <X size=
- Line 112: Full Name
- Line 115: .Program.
- Line 119: .UserFormModal.
- Line 126: Email Address
- Line 119: .UserFormModal.
- Line 140: Password {
- Line 119: .UserFormModal.
- Line 149: 'Leave blank to keep current'
- Line 149: 'Enter password'
- Line 119: .UserFormModal.
- Line 157: <EyeOff size=
- Line 157: <Eye size=
- Line 119: .UserFormModal.
- Line 184: Cancel
- Line 119: .UserFormModal.
- Line 191: 'Saving.
- Line 191: 'Update User'
- Line 191: 'Create User'
- Line 200: UserFormModal;

#### Incorrect Translation Key Usage
- Line 115: type="t("auto.Program.1cb251ec")"
- Line 119: placeholder="t("auto.UserFormModal.a87b2916")"
- Line 129: type="t("auto.UserFormModal.0c83f57c")"
- Line 143: className="t("auto.UserFormModal.99c483e1")"
- Line 153: type="t("auto.UserFormModal.ce50a093")"
- Line 153: type="t("auto.UserFormModal.ce50a093")"
- Line 187: type="t("auto.UserFormModal.c79bdf42")"


### components\analysis\ConfirmationModal.tsx

#### Hardcoded Text
- Line 3: Target,
- Line 3: TrendingUp,
- Line 3: Shield,
- Line 3: BarChart,
- Line 3: Sparkles,
- Line 3: ArrowRight }
- Line 4: /AnalysisContext'
- Line 6: GenerationLoading from '
- Line 6: /GenerationLoading'
- Line 8: CheckItem =
- Line 11: .ConfirmationModal.
- Line 11: .ConfirmationModal.
- Line 11: .ConfirmationModal.
- Line 11: .ConfirmationModal.
- Line 11: .ConfirmationModal.
- Line 17: ConfirmationModal:
- Line 36: String(
- Line 37: GenerationLoading will handle redirect
- Line 39: "An unknown error occurred.
- Line 45: <GenerationLoading /
- Line 49: Simple error display,
- Line 11: .ConfirmationModal.
- Line 71: Generate Analysis?
- Line 75: <CheckItem text=
- Line 11: .ConfirmationModal.
- Line 75: <CheckItem text=
- Line 11: .ConfirmationModal.
- Line 75: <CheckItem text=
- Line 11: .ConfirmationModal.
- Line 75: <CheckItem text=
- Line 11: .ConfirmationModal.
- Line 75: <CheckItem text=
- Line 11: .ConfirmationModal.
- Line 11: .ConfirmationModal.
- Line 84: Financial Projections (
- Line 86: Success Probability
- Line 87: -Powered
- Line 88: Industry
- Line 11: .ConfirmationModal.
- Line 94: Generate Analysis
- Line 11: .ConfirmationModal.
- Line 102: ConfirmationModal;

#### Incorrect Translation Key Usage
- Line 11: fill="t("auto.ConfirmationModal.334c4a4c")"
- Line 11: stroke="t("auto.ConfirmationModal.be92d077")"
- Line 11: strokeLinecap="t("auto.ConfirmationModal.9bbd993d")"
- Line 11: strokeLinejoin="t("auto.ConfirmationModal.9bbd993d")"
- Line 55: className="t("auto.ConfirmationModal.de75b584")"
- Line 75: text="t("auto.ConfirmationModal.0a03c56a")"
- Line 76: text="t("auto.ConfirmationModal.9b1a8e5c")"
- Line 77: text="t("auto.ConfirmationModal.4353306d")"
- Line 78: text="t("auto.ConfirmationModal.117a882f")"
- Line 79: text="t("auto.ConfirmationModal.f95cefeb")"
- Line 81: className="t("auto.ConfirmationModal.830a1afa")"
- Line 91: className="t("auto.ConfirmationModal.1904562d")"
- Line 94: className="t("auto.ConfirmationModal.1bbd1cd2")"

#### Icon Positioning
- Line 94: Icon that may need RTL mirroring: <ArrowRight className="t("auto.ConfirmationModal.1bbd1cd2")" />


### components\analysis\GenerationLoading.tsx

#### Hardcoded Text
- Line 4: /AnalysisContext'
- Line 5: FileText,
- Line 5: Calculator,
- Line 5: Shield,
- Line 5: CheckCircle,
- Line 5: Check }
- Line 5: FileText,
- Line 8: 'Processing business information.
- Line 5: Calculator,
- Line 9: 'Calculating financial projections.
- Line 5: Shield,
- Line 10: 'Analyzing risk factors.
- Line 11: 'Generating AI recommendations.
- Line 5: CheckCircle,
- Line 12: 'Finalizing your report.
- Line 15: LoadingStepProps {
- Line 16: .ElementType;
- Line 21: LoadingStep:
- Line 21: <LoadingStepProps>
- Line 33: .GenerationLoading.
- Line 42: GenerationLoading:
- Line 59: Simulate time for each step
- Line 78: Complete!
- Line 88: <LoadingStep
- Line 101: Complete
- Line 108: GenerationLoading;

#### Incorrect Translation Key Usage
- Line 33: className="t("auto.GenerationLoading.001656d8")"


### components\analysis\Step1_BasicInfo.tsx

#### Hardcoded Text
- Line 2: /AnalysisContext'
- Line 3: AlertCircle }
- Line 6: FormFieldProps {
- Line 8: .ReactNode;
- Line 13: FormField =
- Line 13: FormFieldProps)
- Line 21: <AlertCircle size=
- Line 28: InputProps extends React.
- Line 28: <HTMLInputElement>
- Line 32: <InputProps>
- Line 42: SelectProps extends React.
- Line 42: <HTMLSelectElement>
- Line 46: Select:
- Line 46: <SelectProps>
- Line 58: TextAreaProps extends React.
- Line 58: <HTMLTextAreaElement>
- Line 62: TextArea:
- Line 62: <TextAreaProps>
- Line 73: CheckboxGroupProps {
- Line 28: <HTMLInputElement>
- Line 83: CheckboxGroup =
- Line 83: CheckboxGroupProps)
- Line 21: <AlertCircle size=
- Line 129: 'Failed to fetch template fields:
- Line 137: <HTMLInputElement |
- Line 137: HTMLSelectElement |
- Line 137: HTMLTextAreaElement>
- Line 141: Clear error when user starts typing
- Line 28: <HTMLInputElement>
- Line 137: <HTMLInputElement |
- Line 137: HTMLSelectElement |
- Line 137: HTMLTextAreaElement>
- Line 166: Find the field to get validation rules
- Line 169: Validate on blur
- Line 166: Find the field to get validation rules
- Line 200: Generic rendering based on template fields
- Line 210: <FormField
- Line 227: /FormField>
- Line 210: <FormField
- Line 237: <TextArea
- Line 227: /FormField>
- Line 210: <FormField
- Line 258: <Select
- Line 270: /Select>
- Line 227: /FormField>
- Line 275: <CheckboxGroup

#### Incorrect Translation Key Usage
- Line 14: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 14: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 88: className="t("auto.Step1_BasicInfo.6a0d104e")"
- Line 92: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 204: className="t("auto.Step1_BasicInfo.eeefd75c")"


### components\analysis\Step2_Financials.tsx

#### Hardcoded Text
- Line 2: /AnalysisContext'
- Line 3: AlertCircle }
- Line 6: FormFieldProps {
- Line 8: .ReactNode;
- Line 13: FormField =
- Line 13: FormFieldProps)
- Line 21: <AlertCircle size=
- Line 28: InputProps extends React.
- Line 28: <HTMLInputElement>
- Line 32: <InputProps>
- Line 42: SelectProps extends React.
- Line 42: <HTMLSelectElement>
- Line 46: Select:
- Line 46: <SelectProps>
- Line 58: TextAreaProps extends React.
- Line 58: <HTMLTextAreaElement>
- Line 62: TextArea:
- Line 62: <TextAreaProps>
- Line 73: CheckboxGroupProps {
- Line 28: <HTMLInputElement>
- Line 83: CheckboxGroup =
- Line 83: CheckboxGroupProps)
- Line 21: <AlertCircle size=
- Line 129: 'Failed to fetch template fields:
- Line 137: <HTMLInputElement |
- Line 137: HTMLSelectElement |
- Line 137: HTMLTextAreaElement>
- Line 141: Clear error when user starts typing
- Line 28: <HTMLInputElement>
- Line 137: <HTMLInputElement |
- Line 137: HTMLSelectElement |
- Line 137: HTMLTextAreaElement>
- Line 166: Find the field to get validation rules
- Line 169: Validate on blur
- Line 166: Find the field to get validation rules
- Line 210: Generic rendering based on template fields
- Line 220: <FormField
- Line 237: /FormField>
- Line 220: <FormField
- Line 237: /FormField>
- Line 220: <FormField
- Line 268: <TextArea
- Line 237: /FormField>
- Line 220: <FormField
- Line 289: <Select
- Line 301: /Select>
- Line 237: /FormField>
- Line 306: <CheckboxGroup

#### Incorrect Translation Key Usage
- Line 14: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 14: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 88: className="t("auto.Step1_BasicInfo.6a0d104e")"
- Line 92: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 214: className="t("auto.Step1_BasicInfo.eeefd75c")"


### components\analysis\Step3_Operations.tsx

#### Hardcoded Text
- Line 2: /AnalysisContext'
- Line 3: AlertCircle }
- Line 6: FormFieldProps {
- Line 8: .ReactNode;
- Line 13: FormField =
- Line 13: FormFieldProps)
- Line 21: <AlertCircle size=
- Line 28: InputProps extends React.
- Line 28: <HTMLInputElement>
- Line 32: <InputProps>
- Line 42: SelectProps extends React.
- Line 42: <HTMLSelectElement>
- Line 46: Select:
- Line 46: <SelectProps>
- Line 58: TextAreaProps extends React.
- Line 58: <HTMLTextAreaElement>
- Line 62: TextArea:
- Line 62: <TextAreaProps>
- Line 73: CheckboxGroupProps {
- Line 28: <HTMLInputElement>
- Line 83: CheckboxGroup =
- Line 83: CheckboxGroupProps)
- Line 21: <AlertCircle size=
- Line 129: 'Failed to fetch template fields:
- Line 137: <HTMLInputElement |
- Line 137: HTMLSelectElement |
- Line 137: HTMLTextAreaElement>
- Line 141: Clear error when user starts typing
- Line 28: <HTMLInputElement>
- Line 137: <HTMLInputElement |
- Line 137: HTMLSelectElement |
- Line 137: HTMLTextAreaElement>
- Line 166: Find the field to get validation rules
- Line 169: Validate on blur
- Line 166: Find the field to get validation rules
- Line 210: Generic rendering based on template fields
- Line 220: <FormField
- Line 237: /FormField>
- Line 220: <FormField
- Line 237: /FormField>
- Line 220: <FormField
- Line 268: <TextArea
- Line 237: /FormField>
- Line 220: <FormField
- Line 289: <Select
- Line 301: /Select>
- Line 237: /FormField>
- Line 306: <CheckboxGroup

#### Incorrect Translation Key Usage
- Line 14: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 14: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 88: className="t("auto.Step1_BasicInfo.6a0d104e")"
- Line 92: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 214: className="t("auto.Step1_BasicInfo.eeefd75c")"


### components\analysis\Step4_MarketStrategy.tsx

#### Hardcoded Text
- Line 2: /AnalysisContext'
- Line 3: AlertCircle }
- Line 6: FormFieldProps {
- Line 8: .ReactNode;
- Line 13: FormField =
- Line 13: FormFieldProps)
- Line 21: <AlertCircle size=
- Line 28: InputProps extends React.
- Line 28: <HTMLInputElement>
- Line 32: <InputProps>
- Line 42: SelectProps extends React.
- Line 42: <HTMLSelectElement>
- Line 46: Select:
- Line 46: <SelectProps>
- Line 58: TextAreaProps extends React.
- Line 58: <HTMLTextAreaElement>
- Line 62: TextArea:
- Line 62: <TextAreaProps>
- Line 73: CheckboxGroupProps {
- Line 28: <HTMLInputElement>
- Line 83: CheckboxGroup =
- Line 83: CheckboxGroupProps)
- Line 21: <AlertCircle size=
- Line 129: 'Failed to fetch template fields:
- Line 137: <HTMLInputElement |
- Line 137: HTMLSelectElement |
- Line 137: HTMLTextAreaElement>
- Line 141: Clear error when user starts typing
- Line 28: <HTMLInputElement>
- Line 137: <HTMLInputElement |
- Line 137: HTMLSelectElement |
- Line 137: HTMLTextAreaElement>
- Line 166: Find the field to get validation rules
- Line 169: Validate on blur
- Line 166: Find the field to get validation rules
- Line 210: Generic rendering based on template fields
- Line 220: <FormField
- Line 237: /FormField>
- Line 220: <FormField
- Line 237: /FormField>
- Line 220: <FormField
- Line 268: <TextArea
- Line 237: /FormField>
- Line 220: <FormField
- Line 289: <Select
- Line 301: /Select>
- Line 237: /FormField>
- Line 306: <CheckboxGroup

#### Incorrect Translation Key Usage
- Line 14: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 14: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 88: className="t("auto.Step1_BasicInfo.6a0d104e")"
- Line 92: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 214: className="t("auto.Step1_BasicInfo.eeefd75c")"


### components\analysis\Step5_IndustrySpecific.tsx

#### Hardcoded Text
- Line 2: /AnalysisContext'
- Line 3: AlertCircle }
- Line 6: CheckboxGroupProps {
- Line 11: <HTMLInputElement>
- Line 15: CheckboxGroup =
- Line 15: CheckboxGroupProps)
- Line 35: <AlertCircle size=
- Line 42: SelectProps extends React.
- Line 42: <HTMLSelectElement>
- Line 46: Select:
- Line 46: <SelectProps>
- Line 58: InputProps extends React.
- Line 11: <HTMLInputElement>
- Line 62: <InputProps>
- Line 89: 'Failed to fetch template fields:
- Line 42: <HTMLSelectElement>
- Line 11: <HTMLInputElement>
- Line 11: <HTMLInputElement>
- Line 42: <HTMLSelectElement>
- Line 11: <HTMLInputElement>
- Line 163: 'This field is required'
- Line 167: Generic rendering based on template fields
- Line 175: 'Dropdown'
- Line 179: <Select
- Line 191: /Select>
- Line 35: <AlertCircle size=
- Line 203: <CheckboxGroup
- Line 213: 'Number'
- Line 35: <AlertCircle size=
- Line 242: .Program.
- Line 35: <AlertCircle size=

#### Incorrect Translation Key Usage
- Line 16: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 18: className="t("auto.Step1_BasicInfo.6a0d104e")"
- Line 22: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 171: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 242: type="t("auto.Program.1cb251ec")"


### components\LanguageDirectionHandler.tsx

#### Hardcoded Text
- Line 2: /LanguageContext'
- Line 4: LanguageDirectionHandler:
- Line 8: Set the document direction based on the selected language
- Line 21: LanguageDirectionHandler;


### components\layout\AdminLayout.tsx

#### Hardcoded Text
- Line 3: Outlet,
- Line 3: NavLink,
- Line 4: Header from '
- Line 4: /Header'
- Line 5: /AuthContext'
- Line 6: LayoutDashboard,
- Line 6: FileText,
- Line 6: Settings,
- Line 6: History }
- Line 8: AdminLayout:
- Line 6: LayoutDashboard,
- Line 34: .AdminLayout.
- Line 6: FileText,
- Line 6: Settings,
- Line 39: History,
- Line 44: <Header /
- Line 34: .AdminLayout.
- Line 53: <NavLink key=
- Line 56: /NavLink>
- Line 34: .AdminLayout.
- Line 60: <Outlet /
- Line 68: AdminLayout;

#### Incorrect Translation Key Usage
- Line 46: className="t("auto.AdminLayout.b10df59b")"
- Line 59: className="t("auto.AdminLayout.6adb5be9")"


### components\layout\DeveloperLayout.tsx

#### Hardcoded Text
- Line 2: Outlet,
- Line 2: NavLink,
- Line 3: Header from '
- Line 3: /Header'
- Line 4: /AuthContext'
- Line 6: LayoutDashboard,
- Line 7: FileText,
- Line 10: Settings,
- Line 12: Database,
- Line 13: Activity
- Line 16: DeveloperLayout:
- Line 6: LayoutDashboard,
- Line 7: FileText,
- Line 12: Database,
- Line 10: Settings,
- Line 47: Activity,
- Line 53: <Header /
- Line 55: .AdminLayout.
- Line 56: Control
- Line 62: <NavLink
- Line 70: /NavLink>
- Line 55: .AdminLayout.
- Line 74: <Outlet /
- Line 82: DeveloperLayout;

#### Incorrect Translation Key Usage
- Line 55: className="t("auto.AdminLayout.b10df59b")"
- Line 73: className="t("auto.AdminLayout.6adb5be9")"


### components\layout\Header.tsx

#### Hardcoded Text
- Line 2: NavLink,
- Line 3: /AuthContext'
- Line 4: /LanguageContext'
- Line 5: TrendingUp,
- Line 5: User as UserIcon,
- Line 5: LogOut,
- Line 5: LayoutDashboard,
- Line 5: Globe }
- Line 6: NotificationDropdown from '
- Line 6: /NotificationDropdown'
- Line 8: Header:
- Line 14: <HTMLDivElement>
- Line 14: <HTMLDivElement>
- Line 24: MouseEvent)
- Line 32: .Header.
- Line 32: .Header.
- Line 47: <NavLink to=
- Line 47: /NavLink>
- Line 47: <NavLink to=
- Line 47: /NavLink>
- Line 47: <NavLink to=
- Line 47: /NavLink>
- Line 47: <NavLink to=
- Line 47: /NavLink>
- Line 47: <NavLink to=
- Line 47: /NavLink>
- Line 60: Language Toggle *
- Line 61: .UserFormModal.
- Line 67: <Globe size=
- Line 32: .Header.
- Line 96: <NotificationDropdown /
- Line 32: .Header.
- Line 121: <LayoutDashboard size=
- Line 125: <UserIcon size=
- Line 128: <LogOut size=
- Line 140: Header;

#### Incorrect Translation Key Usage
- Line 61: className="t("auto.UserFormModal.99c483e1")"
- Line 72: className="t("auto.Header.7176d57e")"
- Line 103: className="t("auto.Header.b6c158ba")"

#### Icon Positioning
- Line 125: Icon that may need RTL mirroring: <UserIcon size={16} />


### components\layout\MainLayout.tsx

#### Hardcoded Text
- Line 3: Outlet,
- Line 4: Header from '
- Line 4: /Header'
- Line 5: /AuthContext'
- Line 7: MainLayout:
- Line 27: <Header /
- Line 28: .MainLayout.
- Line 29: <Outlet /
- Line 35: MainLayout;

#### Incorrect Translation Key Usage
- Line 28: className="t("auto.MainLayout.a03da62c")"


### components\NotificationDropdown.tsx

#### Hardcoded Text
- Line 3: /AuthContext'
- Line 4: CheckCircle,
- Line 4: AlertCircle,
- Line 4: AlertTriangle,
- Line 4: CheckCheck,
- Line 7: Notification {
- Line 17: NotificationDropdown:
- Line 21: <Notification[
- Line 24: <HTMLDivElement>
- Line 21: <Notification[
- Line 40: Limit to most recent
- Line 44: 'Failed to fetch notifications:
- Line 50: .MouseEvent)
- Line 67: 'Failed to mark notification as read:
- Line 50: .MouseEvent)
- Line 87: 'Failed to mark all notifications as read:
- Line 50: .MouseEvent)
- Line 97: 'DELETE'
- Line 110: 'Failed to delete notification:
- Line 114: Notification)
- Line 115: Mark as read if not already
- Line 120: Navigate if there'
- Line 134: Fetch notifications when dropdown opens or periodically
- Line 141: Poll for new notifications every
- Line 151: Update time displays every
- Line 154: Force a re-
- Line 156: Update every
- Line 161: Close dropdown when clicking outside
- Line 163: MouseEvent)
- Line 188: Check if date is valid
- Line 190: .NotificationDropdown.
- Line 190: .NotificationDropdown.
- Line 198: Log for debugging
- Line 201: Less than a minute
- Line 190: .NotificationDropdown.
- Line 208: Less than an hour
- Line 215: Less than a day
- Line 222: Less than a week
- Line 227: More than a week -
- Line 236: .UserFormModal.
- Line 190: .NotificationDropdown.
- Line 252: Header *
- Line 190: .NotificationDropdown.
- Line 270: Mark all read
- Line 190: .NotificationDropdown.
- Line 282: Notifications List *
- Line 190: .NotificationDropdown.
- Line 190: .NotificationDropdown.
- Line 352: Footer *
- Line 362: View all notifications
- Line 372: NotificationDropdown;

#### Incorrect Translation Key Usage
- Line 236: className="t("auto.UserFormModal.99c483e1")"
- Line 240: aria-label="t("notifications.title")"
- Line 242: className="t("auto.NotificationDropdown.6012164e")"
- Line 267: title="t("notifications.markAllRead")"
- Line 269: className="t("auto.NotificationDropdown.781f772b")"
- Line 277: className="t("auto.NotificationDropdown.5f55995a")"
- Line 310: className="t("auto.NotificationDropdown.8446247d")"
- Line 330: title="t("auto.NotificationDropdown.58111686")"
- Line 338: title="t("common.delete")"


### pages\admin\AdminDashboard.tsx

#### Hardcoded Text
- Line 3: FileText,
- Line 3: BarChart,
- Line 3: Server,
- Line 3: CheckCircle,
- Line 3: AlertTriangle,
- Line 3: Database }
- Line 7: StatCard =
- Line 7: .ElementType;
- Line 20: QuickStat =
- Line 27: AdminDashboard:
- Line 43: Promise.
- Line 50: 'Active'
- Line 56: 'Failed to load stats'
- Line 62: <StatCard title=
- Line 62: .AdminDashboard.
- Line 62: {String(
- Line 62: <StatCard title=
- Line 62: {String(
- Line 62: <StatCard title=
- Line 62: {String(
- Line 64: {FileText}
- Line 62: <StatCard title=
- Line 62: .AdminDashboard.
- Line 65: {BarChart}
- Line 62: .AdminDashboard.
- Line 62: .AdminDashboard.
- Line 62: .AdminDashboard.
- Line 98: <QuickStat title=
- Line 98: <QuickStat title=
- Line 98: <QuickStat title=
- Line 108: AdminDashboard;

#### Incorrect Translation Key Usage
- Line 62: title="t("auto.AdminDashboard.71941274")"
- Line 63: title="t("dashboard.activeUsers")"
- Line 64: title="t("dashboard.totalAnalyses")"
- Line 65: title="t("auto.AdminDashboard.dd54ccde")"
- Line 75: className="t("auto.AdminDashboard.65abb98f")"
- Line 75: className="t("auto.AdminDashboard.65abb98f")"
- Line 75: className="t("auto.AdminDashboard.65abb98f")"
- Line 98: title="t("admin.adminUsers")"
- Line 99: title="t("admin.analysesThisMonth")"
- Line 100: title="t("admin.deletedUsers")"


### pages\admin\AdminLogs.tsx

#### Hardcoded Text
- Line 3: FileText,
- Line 3: Search,
- Line 3: Filter,
- Line 3: Download,
- Line 3: RefreshCw,
- Line 3: AlertCircle,
- Line 3: CheckCircle,
- Line 3: AlertTriangle }
- Line 6: ActivityLog {
- Line 22: LogStats {
- Line 31: AdminLogs:
- Line 32: <ActivityLog[
- Line 33: <LogStats |
- Line 46: <ActivityLog |
- Line 53: URLSearchParams(
- Line 64: Detect new logs
- Line 67: ActivityLog)
- Line 78: 'Failed to fetch logs:
- Line 87: <LogStats>
- Line 90: 'Failed to fetch stats:
- Line 100: 'Failed to fetch actions:
- Line 105: 'Are you sure you want to delete logs older than
- Line 109: 'DELETE'
- Line 110: 'Old logs cleared successfully'
- Line 114: 'Failed to clear logs:
- Line 115: 'Failed to clear old logs'
- Line 124: Silent refresh
- Line 131: Initial load and filter changes
- Line 189: .MouseEvent)
- Line 190: Prevent opening modal when clicking delete
- Line 192: 'Are you sure you want to delete this activity log?
- Line 192: This action cannot be undone.
- Line 109: 'DELETE'
- Line 200: Remove from local state
- Line 204: Refresh stats
- Line 207: 'Failed to delete log:
- Line 208: 'Failed to delete activity log.
- Line 208: Please try again.
- Line 67: ActivityLog)
- Line 226: Activity
- Line 236: Last updated:
- Line 245: .AdminLogs.
- Line 265: (Number(
- Line 245: .AdminLogs.
- Line 285: .ConfirmationModal.
- Line 286: Refresh
- Line 285: .ConfirmationModal.
- Line 293: Clear Old Logs
- Line 298: Stats Cards *
- Line 320: Filters *
- Line 323: .UserFormModal.
- Line 326: .Program.
- Line 245: .AdminLogs.
- Line 245: .AdminLogs.
- Line 245: .AdminLogs.
- Line 352: .ActivityLog.
- Line 353: .ActivityLogsController.
- Line 353: .ActivityLogsController.
- Line 360: Logs Table *
- Line 245: .AdminLogs.
- Line 245: .AdminLogs.
- Line 245: .AdminLogs.
- Line 245: .AdminLogs.
- Line 245: .AdminLogs.
- Line 285: .ConfirmationModal.
- Line 446: Pagination *
- Line 449: Showing {
- Line 245: .AdminLogs.
- Line 457: Previous
- Line 471: Details Modal *
- Line 245: .AdminLogs.
- Line 245: .AdminLogs.
- Line 285: .ConfirmationModal.
- Line 285: .ConfirmationModal.
- Line 285: .ConfirmationModal.
- Line 285: .ConfirmationModal.
- Line 245: .AdminLogs.
- Line 489: Basic Info *
- Line 501: Action &
- Line 501: Severity *
- Line 245: .AdminLogs.
- Line 245: .AdminLogs.
- Line 522: User Info *
- Line 536: Entity Info *
- Line 550: Description *
- Line 556: Technical Details *
- Line 245: .AdminLogs.
- Line 575: Additional Details *
- Line 601: AdminLogs;

#### Incorrect Translation Key Usage
- Line 245: className="t("auto.AdminLogs.9edfbb10")"
- Line 249: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 267: aria-label="t("auto.AdminLogs.0ea33efb")"
- Line 285: className="t("auto.ConfirmationModal.1bbd1cd2")"
- Line 285: className="t("auto.ConfirmationModal.1bbd1cd2")"
- Line 323: className="t("auto.UserFormModal.99c483e1")"
- Line 326: type="t("auto.Program.1cb251ec")"
- Line 327: placeholder="t("auto.AdminLogs.412a9c03")"
- Line 338: aria-label="t("auto.AdminLogs.99d03978")"
- Line 349: aria-label="t("auto.AdminLogs.7367d2ff")"
- Line 352: value="t("auto.ActivityLog.4059b025")"
- Line 353: value="t("auto.ActivityLogsController.0eaadb4f")"
- Line 354: value="t("common.error")"
- Line 355: value="t("auto.ActivityLogsController.278d01e5")"
- Line 375: className="t("auto.AdminLogs.d486f799")"
- Line 408: className="t("auto.AdminLogs.c5abe331")"
- Line 409: className="t("auto.AdminLogs.244f58cf")"
- Line 426: title="t("auto.AdminLogs.c1797353")"
- Line 434: title="t("auto.AdminLogs.af0775a3")"
- Line 285: className="t("auto.ConfirmationModal.1bbd1cd2")"
- Line 245: className="t("auto.AdminLogs.9edfbb10")"
- Line 480: aria-label="t("auto.AdminLogs.ce2cbc2e")"
- Line 482: className="t("auto.AdminLogs.e2fdd9e3")"
- Line 482: fill="t("auto.ConfirmationModal.334c4a4c")"
- Line 482: stroke="t("auto.ConfirmationModal.be92d077")"
- Line 483: strokeLinecap="t("auto.ConfirmationModal.9bbd993d")"
- Line 483: strokeLinejoin="t("auto.ConfirmationModal.9bbd993d")"
- Line 483: d="t("auto.AdminLogs.28c72870")"
- Line 505: className="t("auto.AdminLogs.cc2c9aab")"
- Line 505: className="t("auto.AdminLogs.cc2c9aab")"
- Line 559: className="t("auto.AdminLogs.d84d5bcb")"


### pages\admin\AdminSettings.tsx

#### Hardcoded Text
- Line 2: React from '
- Line 4: AdminSettings:
- Line 5: Configuration Content
- Line 8: AdminSettings;


### pages\admin\AdminTemplates.tsx

#### Hardcoded Text
- Line 2: React from '
- Line 4: AdminTemplates:
- Line 5: Management Content
- Line 8: AdminTemplates;


### pages\admin\AdminUsers.tsx

#### Hardcoded Text
- Line 3: AdminUser }
- Line 4: Search,
- Line 4: CheckCircle,
- Line 4: XCircle }
- Line 5: CreateUserRequest,
- Line 5: UpdateUserRequest }
- Line 6: UserFormModal,
- Line 6: UserFormData }
- Line 6: /UserFormModal'
- Line 8: AdminUser[
- Line 9: 'System Administrator'
- Line 9: 'Active'
- Line 10: 'John Doe'
- Line 9: 'Active'
- Line 11: 'Jane Smith'
- Line 9: 'Active'
- Line 14: AdminUsers:
- Line 35: 'Failed to load users'
- Line 60: UserFormData)
- Line 65: Update existing user
- Line 66: UpdateUserRequest =
- Line 73: 'User updated successfully!
- Line 75: Create new user
- Line 76: CreateUserRequest =
- Line 83: 'User created successfully!
- Line 89: 'Failed to save user'
- Line 94: `Are you sure you want to delete user "
- Line 94: .AdminUsers.
- Line 94: This action cannot be undone.
- Line 98: 'User deleted successfully!
- Line 101: 'Failed to delete user'
- Line 105: Filter users based on search and filters
- Line 124: Notification *
- Line 139: User Form Modal *
- Line 140: <UserFormModal
- Line 155: <Plus size=
- Line 155: Add User
- Line 162: .Program.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 208: No users found matching your criteria.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 9: 'Active'
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 94: .AdminUsers.
- Line 233: <Edit size=
- Line 254: AdminUsers;

#### Incorrect Translation Key Usage
- Line 162: type="t("auto.Program.1cb251ec")"
- Line 163: placeholder="t("auto.AdminUsers.f5e8b59c")"
- Line 173: aria-label="t("auto.AdminUsers.55aaa373")"
- Line 175: value="t("auto.AdminUsers.a181a603")"
- Line 183: aria-label="t("auto.AdminUsers.61baad7c")"
- Line 175: value="t("auto.AdminUsers.a181a603")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 196: className="t("auto.AdminUsers.ff88093a")"
- Line 231: title="t("admin.editUser")"
- Line 238: title="t("admin.deleteUser")"

#### Icon Positioning
- Line 155: Icon that may need RTL mirroring: <Plus size={16} />


### pages\admin\AdminWebsite.tsx

#### Hardcoded Text
- Line 2: React from '
- Line 4: AdminWebsite:
- Line 5: Configuration Content
- Line 8: AdminWebsite;


### pages\Dashboard.tsx

#### Hardcoded Text
- Line 3: /AuthContext'
- Line 4: /LanguageContext'
- Line 5: FileText,
- Line 5: TrendingUp,
- Line 5: DollarSign,
- Line 5: ArrowRight,
- Line 5: BarChart,
- Line 5: CircleDot,
- Line 5: CheckCircle,
- Line 5: Clock }
- Line 6: RecentAnalysis }
- Line 10: DashboardStats {
- Line 17: Dashboard:
- Line 21: <DashboardStats |
- Line 22: <RecentAnalysis[
- Line 30: Fetch stats
- Line 31: <DashboardStats>
- Line 34: Fetch recent analyses
- Line 22: <RecentAnalysis[
- Line 38: 'Failed to fetch dashboard data:
- Line 5: FileText,
- Line 5: TrendingUp,
- Line 5: DollarSign,
- Line 83: FileText }
- Line 84: BarChart }
- Line 85: CircleDot }
- Line 88: StatusIcon =
- Line 88: RecentAnalysis[
- Line 89: 'Complete'
- Line 90: 'Processing'
- Line 102: <Plus size=
- Line 164: .Dashboard.
- Line 167: <StatusIcon status=
- Line 197: Dashboard;

#### Incorrect Translation Key Usage
- Line 164: className="t("auto.Dashboard.abec3686")"
- Line 180: className="t("auto.Step1_BasicInfo.eeefd75c")"

#### Icon Positioning
- Line 102: Icon that may need RTL mirroring: <Plus size={18} />
- Line 167: Icon that may need RTL mirroring: <StatusIcon status={analysis.status} />
- Line 171: Icon that may need RTL mirroring: <ArrowRight className="h-5 w-5 text-gray-400" />


### pages\developer\CreateField.tsx

#### Hardcoded Text
- Line 5: /LanguageContext'
- Line 7: FieldOption {
- Line 12: CreateField:
- Line 20: <FieldOption[
- Line 43: Get any passed state from navigation
- Line 92: Object.
- Line 95: .FormEvent)
- Line 106: Ensure templateId is valid
- Line 109: 'Invalid template ID'
- Line 115: Will be set properly when saved in template
- Line 130: Automatically navigate back to template builder after successful save
- Line 131: Using the correct route pattern from App.
- Line 134: .CreateField.
- Line 139: 'Failed to create field:
- Line 140: 'Failed to create field.
- Line 140: Please try again.
- Line 131: Using the correct route pattern from App.
- Line 152: .AdminLayout.
- Line 158: <X size=
- Line 134: .CreateField.
- Line 174: .Program.
- Line 174: .Program.
- Line 174: .Program.
- Line 227: .UserFormModal.
- Line 230: `Remove option $
- Line 238: .AdminLogs.
- Line 174: .Program.
- Line 174: .Program.
- Line 227: .UserFormModal.
- Line 261: <Plus size=
- Line 281: Explain why this field exists and how the AI should use the user'
- Line 238: .AdminLogs.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 227: .UserFormModal.
- Line 227: .UserFormModal.
- Line 401: .ConfirmationModal.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 401: .ConfirmationModal.
- Line 134: .CreateField.
- Line 134: .CreateField.
- Line 401: .ConfirmationModal.
- Line 418: CreateField;

#### Incorrect Translation Key Usage
- Line 152: className="t("auto.AdminLayout.6adb5be9")"
- Line 168: className="t("auto.CreateField.028d2a3b")"
- Line 174: type="t("auto.Program.1cb251ec")"
- Line 174: type="t("auto.Program.1cb251ec")"
- Line 174: type="t("auto.Program.1cb251ec")"
- Line 227: type="t("auto.UserFormModal.ce50a093")"
- Line 238: className="t("auto.AdminLogs.9edfbb10")"
- Line 174: type="t("auto.Program.1cb251ec")"
- Line 174: type="t("auto.Program.1cb251ec")"
- Line 227: type="t("auto.UserFormModal.ce50a093")"
- Line 289: className="t("auto.AdminLogs.d84d5bcb")"
- Line 292: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 293: id="t("auto.CreateField.2a9d32d1")"
- Line 299: htmlFor="t("auto.CreateField.2a9d32d1")"
- Line 292: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 339: id="t("auto.CreateField.bd293dc2")"
- Line 345: htmlFor="t("auto.CreateField.bd293dc2")"
- Line 292: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 353: id="t("auto.CreateField.c30d25fd")"
- Line 359: htmlFor="t("auto.CreateField.c30d25fd")"
- Line 292: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 370: id="t("auto.CreateField.84c07958")"
- Line 376: htmlFor="t("auto.CreateField.84c07958")"
- Line 227: type="t("auto.UserFormModal.ce50a093")"
- Line 395: type="t("auto.UserFormModal.c79bdf42")"
- Line 401: fill="t("auto.ConfirmationModal.334c4a4c")"
- Line 402: className="t("auto.CreateField.a59f9c1e")"
- Line 403: className="t("auto.CreateField.f15d6b21")"
- Line 403: fill="t("auto.ConfirmationModal.be92d077")"

#### Icon Positioning
- Line 261: Icon that may need RTL mirroring: <Plus size={16} />


### pages\developer\DeveloperApiKeys.tsx

#### Hardcoded Text
- Line 2: EyeOff,
- Line 4: ApiKey {
- Line 13: DeveloperApiKeys:
- Line 14: <ApiKey[
- Line 17: .DeveloperApiKeys.
- Line 17: .DeveloperApiKeys.
- Line 17: .DeveloperApiKeys.
- Line 17: .DeveloperApiKeys.
- Line 17: .DeveloperApiKeys.
- Line 54: 'API key copied to clipboard!
- Line 59: 'Please enter a name for the API key'
- Line 63: ApiKey =
- Line 17: .DeveloperApiKeys.
- Line 78: 'Are you sure you want to delete this API key?
- Line 78: This action cannot be undone.
- Line 98: .AdminLayout.
- Line 102: API keys and service
- Line 108: <Plus size=
- Line 109: Create New API Key
- Line 109: New API
- Line 116: .ConfirmationModal.
- Line 118: .Program.
- Line 17: .DeveloperApiKeys.
- Line 128: Create
- Line 137: Cancel
- Line 17: .DeveloperApiKeys.
- Line 17: .DeveloperApiKeys.
- Line 17: .DeveloperApiKeys.
- Line 17: .DeveloperApiKeys.
- Line 155: Status
- Line 17: .DeveloperApiKeys.
- Line 158: Created
- Line 17: .DeveloperApiKeys.
- Line 161: Last Used
- Line 17: .DeveloperApiKeys.
- Line 164: Actions
- Line 17: .DeveloperApiKeys.
- Line 17: .DeveloperApiKeys.
- Line 17: .DeveloperApiKeys.
- Line 184: <EyeOff size=
- Line 184: <Eye size=
- Line 17: .DeveloperApiKeys.
- Line 191: <Copy size=
- Line 17: .DeveloperApiKeys.
- Line 17: .DeveloperApiKeys.
- Line 213: <Edit size=
- Line 17: .DeveloperApiKeys.
- Line 232: Key Security Best
- Line 17: .DeveloperApiKeys.
- Line 234: API keys in public repositories or client-
- Line 244: DeveloperApiKeys;

#### Incorrect Translation Key Usage
- Line 98: className="t("auto.AdminLayout.6adb5be9")"
- Line 116: className="t("auto.ConfirmationModal.1904562d")"
- Line 118: type="t("auto.Program.1cb251ec")"
- Line 119: placeholder="t("auto.DeveloperApiKeys.f00db52e")"
- Line 146: className="t("auto.DeveloperApiKeys.fb222b7a")"
- Line 148: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 148: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 148: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 148: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 148: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 148: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 174: className="t("auto.DeveloperApiKeys.26119ac0")"
- Line 189: title="t("auto.DeveloperApiKeys.a6127820")"
- Line 218: title="t("auto.DeveloperApiKeys.5254cc38")"

#### Icon Positioning
- Line 108: Icon that may need RTL mirroring: <Plus size={20} />


### pages\developer\DeveloperDashboard.tsx

#### Hardcoded Text
- Line 3: FileText,
- Line 3: Database,
- Line 3: Settings,
- Line 3: Activity }
- Line 5: /LanguageContext'
- Line 7: Template {
- Line 18: DeveloperDashboard:
- Line 19: <Template[
- Line 24: Template name to translation key mapping
- Line 26: 'AI Business Idea Validator'
- Line 27: -Powered SWOT &
- Line 27: PESTEL Builder'
- Line 28: 'AI Pitch Deck Generator'
- Line 29: 'Building the Marketing Plan'
- Line 30: 'Financial Performance Assessment'
- Line 31: 'Assessing Growth Readiness'
- Line 32: 'Gap Analysis'
- Line 33: 'AI Business Health Check'
- Line 34: 'Digital Maturity Assessment'
- Line 35: -Based Market Opportunity Analyzer'
- Line 38: Template description to translation key mapping
- Line 40: 'Validate your business idea with AI-
- Line 41: 'Comprehensive SWOT and PESTEL analysis to evaluate your business strengths,
- Line 42: 'Create a professional investor pitch deck with market analysis,
- Line 43: 'Develop a comprehensive marketing strategy covering target audience,
- Line 44: 'Comprehensive financial performance analysis to identify strengths,
- Line 45: 'Evaluate your organization\
- Line 46: 'Identify gaps between current performance and desired goals across all areas of your business.
- Line 47: 'Comprehensive business health check covering financial,
- Line 48: 'Assess your organization\
- Line 49: 'Analyze potential market opportunities focusing on trends,
- Line 63: Apply translation mapping to database templates
- Line 72: 'Failed to load templates'
- Line 73: Fallback to mock data with new AI templates
- Line 72: 'Failed to load templates'
- Line 195: In a real implementation,
- Line 3: FileText,
- Line 3: Database,
- Line 3: Settings,
- Line 207: Activity,
- Line 219: .AdminLayout.
- Line 220: .ConfirmationModal.
- Line 246: <Plus size=
- Line 246: <Plus size=
- Line 219: .AdminLayout.
- Line 295: .AdminLogs.
- Line 301: <Edit size=
- Line 321: DeveloperDashboard;

#### Incorrect Translation Key Usage
- Line 219: className="t("auto.AdminLayout.6adb5be9")"
- Line 220: className="t("auto.ConfirmationModal.830a1afa")"
- Line 219: className="t("auto.AdminLayout.6adb5be9")"
- Line 295: className="t("auto.AdminLogs.9edfbb10")"

#### Icon Positioning
- Line 246: Icon that may need RTL mirroring: <Plus size={20} />
- Line 246: Icon that may need RTL mirroring: <Plus size={20} />


### pages\developer\DeveloperDatabase.tsx

#### Hardcoded Text
- Line 2: Database,
- Line 2: RefreshCw,
- Line 2: Download,
- Line 2: Upload,
- Line 2: AlertTriangle }
- Line 4: DeveloperDatabase:
- Line 9: Mock data for demonstration
- Line 19: 'Templates'
- Line 20: 'TemplateFields'
- Line 21: 'Analyses'
- Line 22: 'AnalysisResults'
- Line 33: 'Please enter a backup name'
- Line 38: Simulate backup process
- Line 41: `Database backup "
- Line 41: .DeveloperDatabase.
- Line 47: `Are you sure you want to restore the database from "
- Line 41: .DeveloperDatabase.
- Line 47: This will overwrite current data.
- Line 48: `Restoring database from "
- Line 41: .DeveloperDatabase.
- Line 53: `Are you sure you want to delete the backup "
- Line 41: .DeveloperDatabase.
- Line 53: This action cannot be undone.
- Line 54: `Backup "
- Line 41: .DeveloperDatabase.
- Line 59: 'Optimizing database.
- Line 59: This may take a few minutes.
- Line 63: 'Database cache cleared successfully!
- Line 67: .AdminLayout.
- Line 73: .AdminLogs.
- Line 78: <RefreshCw size=
- Line 79: Optimize
- Line 86: Clear Cache
- Line 122: Database Overview
- Line 131: Tables
- Line 140: Backups
- Line 149: Maintenance
- Line 67: .AdminLayout.
- Line 184: .DeveloperApiKeys.
- Line 184: .DeveloperApiKeys.
- Line 187: Table Name
- Line 184: .DeveloperApiKeys.
- Line 190: Records
- Line 184: .DeveloperApiKeys.
- Line 184: .DeveloperApiKeys.
- Line 196: Last Modified
- Line 184: .DeveloperApiKeys.
- Line 199: Actions
- Line 223: Truncate
- Line 73: .AdminLogs.
- Line 240: .Program.
- Line 41: .DeveloperDatabase.
- Line 254: Backing up.
- Line 258: <Download size=
- Line 259: Create Backup
- Line 184: .DeveloperApiKeys.
- Line 184: .DeveloperApiKeys.
- Line 271: Backup Name
- Line 184: .DeveloperApiKeys.
- Line 184: .DeveloperApiKeys.
- Line 184: .DeveloperApiKeys.
- Line 280: Status
- Line 184: .DeveloperApiKeys.
- Line 199: Actions
- Line 309: <Play size=
- Line 41: .DeveloperDatabase.
- Line 310: Restore
- Line 41: .DeveloperDatabase.
- Line 317: Delete
- Line 78: <RefreshCw size=
- Line 340: Run Optimization
- Line 86: Clear Cache
- Line 53: This action cannot be undone.
- Line 364: Reset Database
- Line 378: DeveloperDatabase;

#### Incorrect Translation Key Usage
- Line 67: className="t("auto.AdminLayout.6adb5be9")"
- Line 73: className="t("auto.AdminLogs.9edfbb10")"
- Line 67: className="t("auto.AdminLayout.6adb5be9")"
- Line 184: className="t("auto.DeveloperApiKeys.fb222b7a")"
- Line 186: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 186: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 186: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 186: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 186: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 73: className="t("auto.AdminLogs.9edfbb10")"
- Line 240: type="t("auto.Program.1cb251ec")"
- Line 241: placeholder="t("auto.DeveloperDatabase.ec8515af")"
- Line 184: className="t("auto.DeveloperApiKeys.fb222b7a")"
- Line 186: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 186: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 186: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 186: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 186: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 309: className="t("auto.DeveloperDatabase.671e468d")"
- Line 309: className="t("auto.DeveloperDatabase.671e468d")"

#### Icon Positioning
- Line 258: Icon that may need RTL mirroring: <Download size={16} />


### pages\developer\DeveloperLogin.tsx

#### Hardcoded Text
- Line 3: /LanguageContext'
- Line 4: Globe }
- Line 7: DeveloperLogin:
- Line 9: 'Developer@
- Line 15: .FormEvent)
- Line 24: Store user and token in session storage
- Line 28: Navigate to developer dashboard
- Line 50: Language Toggle *
- Line 51: .UserFormModal.
- Line 57: <Globe size=
- Line 72: .Header.
- Line 51: .UserFormModal.
- Line 51: .UserFormModal.
- Line 51: .UserFormModal.
- Line 72: .Header.
- Line 51: .UserFormModal.
- Line 113: .ConfirmationModal.
- Line 114: .CreateField.
- Line 114: .CreateField.
- Line 114: .CreateField.
- Line 114: .CreateField.
- Line 113: .ConfirmationModal.
- Line 114: .CreateField.
- Line 114: .CreateField.
- Line 113: .ConfirmationModal.
- Line 130: DeveloperLogin;

#### Incorrect Translation Key Usage
- Line 51: className="t("auto.UserFormModal.99c483e1")"
- Line 72: className="t("auto.Header.b6c158ba")"
- Line 77: name="t("auto.UserFormModal.0c83f57c")"
- Line 78: type="t("auto.UserFormModal.0c83f57c")"
- Line 79: autoComplete="t("auto.UserFormModal.0c83f57c")"
- Line 72: className="t("auto.Header.b6c158ba")"
- Line 107: type="t("auto.UserFormModal.c79bdf42")"
- Line 113: fill="t("auto.ConfirmationModal.334c4a4c")"
- Line 114: className="t("auto.CreateField.a59f9c1e")"
- Line 115: className="t("auto.CreateField.f15d6b21")"
- Line 115: fill="t("auto.ConfirmationModal.be92d077")"


### pages\developer\DeveloperLogs.tsx

#### Hardcoded Text
- Line 2: Filter,
- Line 2: Download,
- Line 2: Search,
- Line 2: AlertCircle,
- Line 2: CheckCircle,
- Line 2: AlertTriangle }
- Line 4: LogEntry {
- Line 13: DeveloperLogs:
- Line 14: <LogEntry[
- Line 14: <LogEntry[
- Line 21: Mock data for demonstration
- Line 22: LogEntry[
- Line 27: 'User john@
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 42: 'High memory usage detected:
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 56: 'New template "
- Line 28: .DeveloperLogs.
- Line 64: 'API key validation failed for request from
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 97: Simulate API call
- Line 103: 'Failed to load logs'
- Line 111: Apply search filter
- Line 121: Apply level filter
- Line 126: Apply source filter
- Line 135: 'Are you sure you want to clear all logs?
- Line 135: This action cannot be undone.
- Line 142: 'Exporting logs.
- Line 142: This would download a file with the current logs in a real implementation.
- Line 188: .AdminLayout.
- Line 194: .AdminLogs.
- Line 199: <Download size=
- Line 200: Export Logs
- Line 207: Clear Logs
- Line 215: .UserFormModal.
- Line 220: .Program.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 240: .AdminUsers.
- Line 241: .NotificationDropdown.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 249: Source
- Line 28: .DeveloperLogs.
- Line 28: .DeveloperLogs.
- Line 260: 'All Sources'
- Line 271: .DeveloperApiKeys.
- Line 271: .DeveloperApiKeys.
- Line 274: Timestamp
- Line 271: .DeveloperApiKeys.
- Line 271: .DeveloperApiKeys.
- Line 249: Source
- Line 271: .DeveloperApiKeys.
- Line 283: Message
- Line 271: .DeveloperApiKeys.
- Line 311: 'System'
- Line 323: Try adjusting your search or filter criteria.
- Line 331: Showing {
- Line 194: .AdminLogs.
- Line 335: Previous
- Line 346: DeveloperLogs;

#### Incorrect Translation Key Usage
- Line 188: className="t("auto.AdminLayout.6adb5be9")"
- Line 194: className="t("auto.AdminLogs.9edfbb10")"
- Line 215: className="t("auto.UserFormModal.99c483e1")"
- Line 220: type="t("auto.Program.1cb251ec")"
- Line 221: placeholder="t("auto.DeveloperLogs.412a9c03")"
- Line 225: aria-label="t("auto.DeveloperLogs.007267b2")"
- Line 230: htmlFor="t("auto.DeveloperLogs.f9cf4cc9")"
- Line 234: id="t("auto.DeveloperLogs.f9cf4cc9")"
- Line 238: aria-label="t("auto.DeveloperLogs.619ed0fb")"
- Line 240: value="t("auto.AdminUsers.a181a603")"
- Line 241: value="t("auto.NotificationDropdown.caf9b6b9")"
- Line 242: value="t("auto.DeveloperLogs.1ea4c3ab")"
- Line 244: value="t("auto.DeveloperLogs.ad42f669")"
- Line 248: htmlFor="t("auto.DeveloperLogs.2348e476")"
- Line 252: id="t("auto.DeveloperLogs.2348e476")"
- Line 256: aria-label="t("auto.DeveloperLogs.32ccf0b4")"
- Line 271: className="t("auto.DeveloperApiKeys.fb222b7a")"
- Line 273: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 273: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 273: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 273: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 273: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 194: className="t("auto.AdminLogs.9edfbb10")"

#### Icon Positioning
- Line 199: Icon that may need RTL mirroring: <Download size={16} />


### pages\developer\DeveloperSystem.tsx

#### Hardcoded Text
- Line 2: Settings,
- Line 2: RefreshCw,
- Line 2: Shield,
- Line 2: AlertTriangle,
- Line 2: CheckCircle,
- Line 2: XCircle }
- Line 4: DeveloperSystem:
- Line 8: Mock data for demonstration
- Line 11: .DeveloperSystem.
- Line 27: 'Database Connection'
- Line 28: 'API Service'
- Line 29: 'Authentication Service'
- Line 30: 'File Storage'
- Line 31: 'Email Service'
- Line 32: 'AI Service'
- Line 36: 'Are you sure you want to restart the server?
- Line 36: This will temporarily interrupt service for all users.
- Line 38: Simulate restart process
- Line 41: 'Server restarted successfully!
- Line 47: 'Configuration updated successfully!
- Line 51: 'System cache cleared successfully!
- Line 81: .AdminLayout.
- Line 87: .AdminLogs.
- Line 92: <RefreshCw size=
- Line 93: Clear Cache
- Line 103: Restarting.
- Line 92: <RefreshCw size=
- Line 108: Restart Server
- Line 142: Configuration
- Line 151: Environment Variables
- Line 160: Health Checks
- Line 169: Security
- Line 81: .AdminLayout.
- Line 11: .DeveloperSystem.
- Line 182: Application Name
- Line 185: .Program.
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 194: Default Language
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 209: Timezone
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 232: Maintenance Mode
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 246: Debug Mode
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 272: <Settings size=
- Line 273: Update Configuration
- Line 284: .DeveloperApiKeys.
- Line 284: .DeveloperApiKeys.
- Line 287: Variable
- Line 284: .DeveloperApiKeys.
- Line 284: .DeveloperApiKeys.
- Line 293: Actions
- Line 284: .DeveloperApiKeys.
- Line 313: Delete
- Line 11: .DeveloperSystem.
- Line 272: <Settings size=
- Line 324: Add New Variable
- Line 160: Health
- Line 11: .DeveloperSystem.
- Line 92: <RefreshCw size=
- Line 349: Run Health Checks
- Line 358: .CreateField.
- Line 11: .DeveloperSystem.
- Line 364: Session Timeout (
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 376: Password Requirements
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 387: Minimum
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 398: Require uppercase letter
- Line 409: Require number
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 428: Rate Limiting
- Line 11: .DeveloperSystem.
- Line 433: Requests per minute
- Line 11: .DeveloperSystem.
- Line 11: .DeveloperSystem.
- Line 453: <Shield size=
- Line 454: Run Security Audit
- Line 468: DeveloperSystem;

#### Incorrect Translation Key Usage
- Line 81: className="t("auto.AdminLayout.6adb5be9")"
- Line 87: className="t("auto.AdminLogs.9edfbb10")"
- Line 81: className="t("auto.AdminLayout.6adb5be9")"
- Line 179: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 181: htmlFor="t("auto.DeveloperSystem.b9d55a0c")"
- Line 185: type="t("auto.Program.1cb251ec")"
- Line 186: id="t("auto.DeveloperSystem.b9d55a0c")"
- Line 187: defaultValue="t("auto.DeveloperSystem.001c50d2")"
- Line 189: placeholder="t("auto.DeveloperSystem.07166da5")"
- Line 193: htmlFor="t("auto.DeveloperSystem.7de1466c")"
- Line 197: id="t("auto.DeveloperSystem.7de1466c")"
- Line 199: aria-label="t("auto.DeveloperSystem.c96a77fb")"
- Line 208: htmlFor="t("auto.DeveloperSystem.b2c6cc48")"
- Line 212: id="t("auto.DeveloperSystem.b2c6cc48")"
- Line 214: aria-label="t("auto.DeveloperSystem.236df51b")"
- Line 179: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 227: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 228: id="t("auto.DeveloperSystem.84cc4f8f")"
- Line 231: htmlFor="t("auto.DeveloperSystem.84cc4f8f")"
- Line 227: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 241: id="t("auto.DeveloperSystem.48e635f7")"
- Line 245: htmlFor="t("auto.DeveloperSystem.48e635f7")"
- Line 227: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 255: id="t("auto.DeveloperSystem.93f66cf0")"
- Line 259: htmlFor="t("auto.DeveloperSystem.93f66cf0")"
- Line 267: className="t("auto.DeveloperSystem.42b34b63")"
- Line 284: className="t("auto.DeveloperApiKeys.fb222b7a")"
- Line 286: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 286: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 286: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 303: className="t("auto.DeveloperApiKeys.26119ac0")"
- Line 267: className="t("auto.DeveloperSystem.42b34b63")"
- Line 179: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 267: className="t("auto.DeveloperSystem.42b34b63")"
- Line 358: className="t("auto.CreateField.028d2a3b")"
- Line 179: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 363: htmlFor="t("auto.DeveloperSystem.c280bf60")"
- Line 368: id="t("auto.DeveloperSystem.c280bf60")"
- Line 371: placeholder="t("auto.DeveloperSystem.6e4d9a88")"
- Line 378: className="t("auto.Step1_BasicInfo.6a0d104e")"
- Line 227: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 382: id="t("auto.DeveloperSystem.2781cf95")"
- Line 386: htmlFor="t("auto.DeveloperSystem.2781cf95")"
- Line 227: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 393: id="t("auto.DeveloperSystem.2e994c40")"
- Line 397: htmlFor="t("auto.DeveloperSystem.2e994c40")"
- Line 227: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 179: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 227: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 423: id="t("auto.DeveloperSystem.122889f4")"
- Line 427: htmlFor="t("auto.DeveloperSystem.122889f4")"
- Line 432: htmlFor="t("auto.DeveloperSystem.b91d8bd9")"
- Line 437: id="t("auto.DeveloperSystem.b91d8bd9")"
- Line 440: placeholder="t("auto.DeveloperSystem.575df61e")"


### pages\developer\DeveloperTemplates.tsx

#### Hardcoded Text
- Line 5: /LanguageContext'
- Line 7: Template {
- Line 18: DeveloperTemplates:
- Line 19: <Template[
- Line 25: Template name to translation key mapping
- Line 27: 'AI Business Idea Validator'
- Line 28: -Powered SWOT &
- Line 28: PESTEL Builder'
- Line 29: 'AI Pitch Deck Generator'
- Line 30: 'Building the Marketing Plan'
- Line 31: 'Financial Performance Assessment'
- Line 32: 'Assessing Growth Readiness'
- Line 33: 'Gap Analysis'
- Line 34: 'AI Business Health Check'
- Line 35: 'Digital Maturity Assessment'
- Line 36: -Based Market Opportunity Analyzer'
- Line 39: Template description to translation key mapping
- Line 41: 'Validate your business idea with AI-
- Line 42: 'Comprehensive SWOT and PESTEL analysis to evaluate your business strengths,
- Line 43: 'Create a professional investor pitch deck with market analysis,
- Line 44: 'Develop a comprehensive marketing strategy covering target audience,
- Line 45: 'Comprehensive financial performance analysis to identify strengths,
- Line 46: 'Evaluate your organization\
- Line 47: 'Identify gaps between current performance and desired goals across all areas of your business.
- Line 48: 'Comprehensive business health check covering financial,
- Line 49: 'Assess your organization\
- Line 50: 'Analyze potential market opportunities focusing on trends,
- Line 63: Apply translation mapping to database templates
- Line 72: .DeveloperTemplates.
- Line 73: 'Failed to load templates'
- Line 94: 'Failed to delete template'
- Line 101: In a real implementation,
- Line 102: `Viewing template $
- Line 114: .AdminLayout.
- Line 124: <Plus size=
- Line 124: <Plus size=
- Line 114: .AdminLayout.
- Line 179: .AdminLogs.
- Line 185: <Eye size=
- Line 192: <Edit size=
- Line 212: DeveloperTemplates;

#### Incorrect Translation Key Usage
- Line 114: className="t("auto.AdminLayout.6adb5be9")"
- Line 114: className="t("auto.AdminLayout.6adb5be9")"
- Line 179: className="t("auto.AdminLogs.9edfbb10")"

#### Icon Positioning
- Line 124: Icon that may need RTL mirroring: <Plus size={20} />
- Line 124: Icon that may need RTL mirroring: <Plus size={20} />


### pages\developer\DeveloperTools.tsx

#### Hardcoded Text
- Line 2: Terminal,
- Line 2: StopCircle,
- Line 2: Download,
- Line 2: Upload,
- Line 2: FileText }
- Line 4: DeveloperTools:
- Line 8: 'Developer Console initialized.
- Line 8: Type help for available commands.
- Line 13: 'Console'
- Line 13: Terminal }
- Line 14: 'Debugger'
- Line 15: 'API Tester'
- Line 16: 'Data Import'
- Line 16: Upload }
- Line 17: 'Data Export'
- Line 17: Download }
- Line 20: .FormEvent)
- Line 25: Add user input to output
- Line 33: Process command
- Line 43: 'Available commands:
- Line 44: Show this help message'
- Line 45: Clear the console'
- Line 46: Show application version'
- Line 47: Show system status'
- Line 48: List all users'
- Line 49: List all templates'
- Line 55: 'Application Version:
- Line 56: 'Build Date:
- Line 59: 'System Status:
- Line 59: Operational'
- Line 60: 'Database:
- Line 60: Connected'
- Line 61: Online'
- Line 62: 'Authentication:
- Line 62: Active'
- Line 65: 'Total Users:
- Line 66: 'Active Today:
- Line 67: 'Admin Users:
- Line 68: 'Developer Users:
- Line 71: 'Total Templates:
- Line 72: 'Active Templates:
- Line 73: 'Popular Templates:
- Line 76: `Command not found:
- Line 77: .DeveloperTools.
- Line 85: 'Running tests.
- Line 85: This would execute unit/
- Line 89: 'Starting debugger.
- Line 89: This would attach a debugger to the application in a real implementation.
- Line 93: 'Stopping debugger.
- Line 93: This would detach the debugger in a real implementation.
- Line 97: 'Importing data.
- Line 97: This would import data from a file in a real implementation.
- Line 101: 'Exporting data.
- Line 101: This would export data to a file in a real implementation.
- Line 105: .AdminLayout.
- Line 111: .AdminLogs.
- Line 116: <Play size=
- Line 117: Run Tests
- Line 123: <Bug size=
- Line 124: Start Debugger
- Line 77: .DeveloperTools.
- Line 105: .AdminLayout.
- Line 77: .DeveloperTools.
- Line 168: .Program.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 182: Clear Console
- Line 116: <Play size=
- Line 206: Start Debugging
- Line 212: <StopCircle size=
- Line 213: Stop Debugging
- Line 221: .AdminDashboard.
- Line 221: .AdminDashboard.
- Line 236: Add Breakpoint
- Line 243: Debugger attached to
- Line 244: Listening on port
- Line 245: Waiting for debugger connection.
- Line 77: .DeveloperTools.
- Line 258: HTTP Method
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 274: Endpoint URL
- Line 168: .Program.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 287: Headers
- Line 77: .DeveloperTools.
- Line 293: "Content-
- Line 293: ;Authorization:
- Line 293: Bearer token"
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 299: Request Body
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 305: "Template description"
- Line 77: .DeveloperTools.
- Line 116: <Play size=
- Line 315: Send Request
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 351: XML files (
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 357: .DeveloperSystem.
- Line 362: <Upload size=
- Line 363: Import Data
- Line 357: .DeveloperSystem.
- Line 77: .DeveloperTools.
- Line 372: Data Format
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 392: Overwrite existing data
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 404: Validate data before import
- Line 421: Data to Export
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 445: Templates
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 456: Analyses
- Line 77: .DeveloperTools.
- Line 463: Export Format
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 483: Date Range
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 507: Compress files (
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 77: .DeveloperTools.
- Line 519: Include metadata
- Line 357: .DeveloperSystem.
- Line 530: <Download size=
- Line 531: Export Data
- Line 542: DeveloperTools;

#### Incorrect Translation Key Usage
- Line 105: className="t("auto.AdminLayout.6adb5be9")"
- Line 111: className="t("auto.AdminLogs.9edfbb10")"
- Line 141: className="t("auto.DeveloperTools.26d39cea")"
- Line 105: className="t("auto.AdminLayout.6adb5be9")"
- Line 165: className="t("auto.DeveloperTools.21d71465")"
- Line 168: type="t("auto.Program.1cb251ec")"
- Line 172: placeholder="t("auto.DeveloperTools.61e5516f")"
- Line 173: aria-label="t("auto.DeveloperTools.6524a8bc")"
- Line 200: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 219: className="t("auto.Step1_BasicInfo.6a0d104e")"
- Line 221: className="t("auto.AdminDashboard.65abb98f")"
- Line 221: className="t("auto.AdminDashboard.65abb98f")"
- Line 200: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 257: htmlFor="t("auto.DeveloperTools.db9c30d5")"
- Line 261: id="t("auto.DeveloperTools.db9c30d5")"
- Line 263: aria-label="t("auto.DeveloperTools.e43fae86")"
- Line 273: htmlFor="t("auto.DeveloperTools.e1890704")"
- Line 168: type="t("auto.Program.1cb251ec")"
- Line 278: id="t("auto.DeveloperTools.e1890704")"
- Line 281: placeholder="t("auto.DeveloperTools.922bf35d")"
- Line 282: aria-label="t("auto.DeveloperTools.714291c7")"
- Line 286: htmlFor="t("auto.DeveloperTools.4340fd73")"
- Line 290: id="t("auto.DeveloperTools.4340fd73")"
- Line 294: aria-label="t("auto.DeveloperTools.736943e8")"
- Line 298: htmlFor="t("auto.DeveloperTools.1be38aa3")"
- Line 302: id="t("auto.DeveloperTools.1be38aa3")"
- Line 306: aria-label="t("auto.DeveloperTools.a3ba8461")"
- Line 321: className="t("auto.DeveloperTools.04c50002")"
- Line 321: className="t("auto.DeveloperTools.04c50002")"
- Line 321: className="t("auto.DeveloperTools.04c50002")"
- Line 325: className="t("auto.DeveloperTools.3c2619ff")"
- Line 326: className="t("auto.DeveloperTools.6c2dcb84")"
- Line 327: className="t("auto.DeveloperTools.0499a59c")"
- Line 327: className="t("auto.DeveloperTools.0499a59c")"
- Line 327: className="t("auto.DeveloperTools.0499a59c")"
- Line 326: className="t("auto.DeveloperTools.6c2dcb84")"
- Line 325: className="t("auto.DeveloperTools.3c2619ff")"
- Line 354: type="t("auto.DeveloperTools.8c7dd922")"
- Line 354: className="t("auto.DeveloperTools.662f707d")"
- Line 354: aria-label="t("auto.DeveloperTools.f0f9957b")"
- Line 357: className="t("auto.DeveloperSystem.42b34b63")"
- Line 357: className="t("auto.DeveloperSystem.42b34b63")"
- Line 200: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 371: htmlFor="t("auto.DeveloperTools.897f9760")"
- Line 375: id="t("auto.DeveloperTools.897f9760")"
- Line 377: aria-label="t("auto.DeveloperTools.8e33f11a")"
- Line 386: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 387: id="t("auto.DeveloperTools.77dced08")"
- Line 389: aria-label="t("auto.DeveloperTools.f59b3659")"
- Line 391: htmlFor="t("auto.DeveloperTools.77dced08")"
- Line 386: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 398: id="t("auto.DeveloperTools.f9ab0545")"
- Line 401: aria-label="t("auto.DeveloperTools.1f70a340")"
- Line 403: htmlFor="t("auto.DeveloperTools.f9ab0545")"
- Line 200: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 219: className="t("auto.Step1_BasicInfo.6a0d104e")"
- Line 386: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 427: id="t("auto.DeveloperTools.192b7e3f")"
- Line 430: aria-label="t("auto.DeveloperTools.9f8e9d68")"
- Line 432: htmlFor="t("auto.DeveloperTools.192b7e3f")"
- Line 386: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 439: id="t("auto.DeveloperTools.4e232376")"
- Line 442: aria-label="t("auto.DeveloperTools.4200bcfe")"
- Line 444: htmlFor="t("auto.DeveloperTools.4e232376")"
- Line 386: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 451: id="t("auto.DeveloperTools.d5a87117")"
- Line 453: aria-label="t("auto.DeveloperTools.9627394b")"
- Line 455: htmlFor="t("auto.DeveloperTools.d5a87117")"
- Line 462: htmlFor="t("auto.DeveloperTools.f2632d3a")"
- Line 466: id="t("auto.DeveloperTools.f2632d3a")"
- Line 468: aria-label="t("auto.DeveloperTools.d3e94251")"
- Line 200: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 487: type="t("auto.DeveloperTools.5fc73231")"
- Line 489: aria-label="t("auto.DeveloperTools.4d34f109")"
- Line 487: type="t("auto.DeveloperTools.5fc73231")"
- Line 494: aria-label="t("auto.DeveloperTools.b7de7e42")"
- Line 386: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 501: id="t("auto.DeveloperTools.390626c5")"
- Line 504: aria-label="t("auto.DeveloperTools.5eafaf98")"
- Line 506: htmlFor="t("auto.DeveloperTools.390626c5")"
- Line 386: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 513: id="t("auto.DeveloperTools.4b45b3ec")"
- Line 516: aria-label="t("auto.DeveloperTools.65d181fa")"
- Line 518: htmlFor="t("auto.DeveloperTools.4b45b3ec")"
- Line 357: className="t("auto.DeveloperSystem.42b34b63")"

#### Icon Positioning
- Line 530: Icon that may need RTL mirroring: <Download size={16} />


### pages\developer\DeveloperUsers.tsx

#### Hardcoded Text
- Line 5: DeveloperUsers:
- Line 10: Mock data for demonstration
- Line 12: 'Admin User'
- Line 13: 'Developer User'
- Line 14: 'Regular User'
- Line 15: 'Test User'
- Line 25: In a real implementation,
- Line 31: 'Failed to load users'
- Line 37: 'Create user functionality would be implemented here'
- Line 41: `Edit user $
- Line 45: 'Are you sure you want to delete this user?
- Line 45: This action cannot be undone.
- Line 51: `Viewing user $
- Line 78: .AdminLayout.
- Line 88: <Plus size=
- Line 89: Add New User
- Line 78: .AdminLayout.
- Line 94: .UserFormModal.
- Line 96: .Program.
- Line 97: .DeveloperUsers.
- Line 108: .DeveloperApiKeys.
- Line 108: .DeveloperApiKeys.
- Line 108: .DeveloperApiKeys.
- Line 108: .DeveloperApiKeys.
- Line 108: .DeveloperApiKeys.
- Line 120: Actions
- Line 136: .DeveloperTools.
- Line 156: <Eye size=
- Line 163: <Edit size=
- Line 184: DeveloperUsers;

#### Incorrect Translation Key Usage
- Line 78: className="t("auto.AdminLayout.6adb5be9")"
- Line 93: className="t("auto.AdminLayout.b10df59b")"
- Line 94: className="t("auto.UserFormModal.99c483e1")"
- Line 96: type="t("auto.Program.1cb251ec")"
- Line 97: placeholder="t("auto.DeveloperUsers.f5e8b59c")"
- Line 108: className="t("auto.DeveloperApiKeys.fb222b7a")"
- Line 110: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 110: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 110: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 110: scope="t("auto.DeveloperApiKeys.d89e2ddb")"
- Line 136: className="t("auto.DeveloperTools.04c50002")"
- Line 154: title="t("common.view")"
- Line 161: title="t("common.edit")"
- Line 168: title="t("common.delete")"

#### Icon Positioning
- Line 88: Icon that may need RTL mirroring: <Plus size={20} />


### pages\developer\FieldBuilder.tsx

#### Hardcoded Text
- Line 4: /LanguageContext'
- Line 6: FieldOption {
- Line 11: FieldBuilderProps {
- Line 17: FieldBuilder:
- Line 17: <FieldBuilderProps>
- Line 24: <FieldOption[
- Line 45: Reset form when field prop changes
- Line 59: Reset to defaults for new field
- Line 107: Object.
- Line 110: .MouseEvent |
- Line 110: .FormEvent)
- Line 111: Prevent default behavior to avoid any form submission or navigation
- Line 117: 'FieldBuilder:
- Line 117: 'FieldBuilder:
- Line 133: Calling onSave with fieldData:
- Line 117: 'FieldBuilder:
- Line 117: 'FieldBuilder:
- Line 138: Error in onSave:
- Line 117: 'FieldBuilder:
- Line 141: Validation failed'
- Line 157: .AdminLayout.
- Line 163: .UserFormModal.
- Line 168: <X size=
- Line 172: .CreateField.
- Line 178: .Program.
- Line 178: .Program.
- Line 178: .Program.
- Line 163: .UserFormModal.
- Line 242: .AdminLogs.
- Line 178: .Program.
- Line 178: .Program.
- Line 163: .UserFormModal.
- Line 265: <Plus size=
- Line 242: .AdminLogs.
- Line 172: .CreateField.
- Line 172: .CreateField.
- Line 172: .CreateField.
- Line 172: .CreateField.
- Line 172: .CreateField.
- Line 172: .CreateField.
- Line 172: .CreateField.
- Line 378: .FieldBuilder.
- Line 172: .CreateField.
- Line 163: .UserFormModal.
- Line 163: .UserFormModal.
- Line 412: FieldBuilder;

#### Incorrect Translation Key Usage
- Line 157: className="t("auto.AdminLayout.6adb5be9")"
- Line 163: type="t("auto.UserFormModal.ce50a093")"
- Line 166: aria-label="t("common.close")"
- Line 172: className="t("auto.CreateField.028d2a3b")"
- Line 178: type="t("auto.Program.1cb251ec")"
- Line 178: type="t("auto.Program.1cb251ec")"
- Line 178: type="t("auto.Program.1cb251ec")"
- Line 163: type="t("auto.UserFormModal.ce50a093")"
- Line 242: className="t("auto.AdminLogs.9edfbb10")"
- Line 178: type="t("auto.Program.1cb251ec")"
- Line 178: type="t("auto.Program.1cb251ec")"
- Line 163: type="t("auto.UserFormModal.ce50a093")"
- Line 293: className="t("auto.AdminLogs.d84d5bcb")"
- Line 296: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 297: id="t("auto.CreateField.2a9d32d1")"
- Line 303: htmlFor="t("auto.CreateField.2a9d32d1")"
- Line 296: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 343: id="t("auto.CreateField.bd293dc2")"
- Line 349: htmlFor="t("auto.CreateField.bd293dc2")"
- Line 296: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 357: id="t("auto.CreateField.c30d25fd")"
- Line 363: htmlFor="t("auto.CreateField.c30d25fd")"
- Line 296: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 374: id="t("auto.CreateField.84c07958")"
- Line 378: aria-label="t("auto.FieldBuilder.63edf2bc")"
- Line 380: htmlFor="t("auto.CreateField.84c07958")"
- Line 163: type="t("auto.UserFormModal.ce50a093")"
- Line 398: type="t("auto.UserFormModal.c79bdf42")"

#### Icon Positioning
- Line 265: Icon that may need RTL mirroring: <Plus size={16} />


### pages\developer\TemplateBuilder.tsx

#### Hardcoded Text
- Line 3: ChevronLeft,
- Line 3: GripVertical,
- Line 4: DragDropContext,
- Line 4: Droppable,
- Line 4: Draggable }
- Line 6: /LanguageContext'
- Line 8: TemplateFormData {
- Line 16: TemplateField {
- Line 17: Can be number (
- Line 34: TemplateBuilder:
- Line 42: <TemplateFormData>
- Line 49: For displaying "
- Line 49: Editing:
- Line 52: TemplateField[
- Line 52: TemplateField[
- Line 52: TemplateField[
- Line 52: TemplateField[
- Line 52: TemplateField[
- Line 63: Check for success messages from field creation
- Line 65: Display message to user (
- Line 67: Reload template fields to show the newly added field
- Line 71: Clear the state
- Line 87: 'Failed to load categories'
- Line 103: Set the template name for display
- Line 106: Load fields for each stage
- Line 109: 'TemplateBuilder:
- Line 109: Loaded fields'
- Line 110: Group fields by stage
- Line 117: 'Failed to load template fields'
- Line 120: 'Failed to load template'
- Line 126: <HTMLInputElement |
- Line 126: HTMLTextAreaElement |
- Line 126: HTMLSelectElement>
- Line 128: HTMLInputElement)
- Line 135: Update templateName when name field changes
- Line 140: Clear error when user starts typing
- Line 150: <HTMLSelectElement>
- Line 154: <HTMLInputElement>
- Line 155: This function is no longer needed with the simplified category selection
- Line 191: Object.
- Line 109: 'TemplateBuilder:
- Line 216: Update existing template
- Line 109: 'TemplateBuilder:
- Line 217: Updating existing template'
- Line 221: Create new template
- Line 109: 'TemplateBuilder:
- Line 222: Creating new template'
- Line 109: 'TemplateBuilder:
- Line 226: Created template with ID'
- Line 229: Save all fields for the template
- Line 109: 'TemplateBuilder:
- Line 231: Saving fields for template'
- Line 232: Collect all fields from all stages
- Line 238: Always use the correct templateId
- Line 109: 'TemplateBuilder:
- Line 246: Save each field
- Line 250: Temporary IDs are strings starting with '
- Line 109: 'TemplateBuilder:
- Line 251: Creating new field'
- Line 109: 'TemplateBuilder:
- Line 268: Created field successfully'
- Line 109: 'TemplateBuilder:
- Line 272: Updating existing field'
- Line 109: 'TemplateBuilder:
- Line 288: Updated field successfully'
- Line 291: 'Failed to save field'
- Line 109: 'TemplateBuilder:
- Line 296: Navigation to /
- Line 299: 'Failed to save template'
- Line 300: 'Failed to save template.
- Line 300: Please try again.
- Line 307: Navigate to the new field creation page instead of opening modal
- Line 309: Using the correct route pattern from App.
- Line 312: If template hasn'
- Line 330: Log the template data for debugging
- Line 109: 'TemplateBuilder:
- Line 331: Template data to be saved'
- Line 216: Update existing template
- Line 221: Create new template
- Line 346: Navigate to field creation page using the correct route pattern
- Line 299: 'Failed to save template'
- Line 350: Show more specific error message
- Line 300: 'Failed to save template.
- Line 300: Please try again.
- Line 363: For editing,
- Line 309: Using the correct route pattern from App.
- Line 378: Update fieldOrder for remaining fields
- Line 390: Dropped outside the list
- Line 393: Dropped in the same place
- Line 396: Find the stage and update field order
- Line 403: Reordering within the same stage
- Line 408: Update fieldOrder
- Line 415: Moving between stages
- Line 420: Update stage number
- Line 424: Update fieldOrder for both stages
- Line 450: .AdminLayout.
- Line 456: <ChevronLeft size=
- Line 464: Step Indicator *
- Line 482: Template Metadata *
- Line 486: .CreateField.
- Line 492: .Program.
- Line 493: .DeveloperTools.
- Line 521: .UserFormModal.
- Line 492: .Program.
- Line 553: "General"
- Line 561: .TemplateBuilder.
- Line 587: .ConfirmationModal.
- Line 486: .CreateField.
- Line 486: .CreateField.
- Line 486: .CreateField.
- Line 486: .CreateField.
- Line 587: .ConfirmationModal.
- Line 486: .CreateField.
- Line 486: .CreateField.
- Line 587: .ConfirmationModal.
- Line 595: <Save size=
- Line 493: .DeveloperTools.
- Line 603: Define Inputs *
- Line 609: <DragDropContext onDragEnd=
- Line 486: .CreateField.
- Line 617: <Droppable droppableId=
- Line 622: .AdminUsers.
- Line 625: <Draggable key=
- Line 636: <GripVertical size=
- Line 561: .TemplateBuilder.
- Line 648: <Edit size=
- Line 660: /Draggable>
- Line 669: <Plus size=
- Line 493: .DeveloperTools.
- Line 670: Add New Input Field
- Line 674: /Droppable>
- Line 678: /DragDropContext>
- Line 587: .ConfirmationModal.
- Line 486: .CreateField.
- Line 486: .CreateField.
- Line 486: .CreateField.
- Line 486: .CreateField.
- Line 587: .ConfirmationModal.
- Line 486: .CreateField.
- Line 486: .CreateField.
- Line 587: .ConfirmationModal.
- Line 698: Saving.
- Line 595: <Save size=
- Line 493: .DeveloperTools.
- Line 703: Save Template
- Line 714: TemplateBuilder;

#### Incorrect Translation Key Usage
- Line 450: className="t("auto.AdminLayout.6adb5be9")"
- Line 486: className="t("auto.CreateField.028d2a3b")"
- Line 492: type="t("auto.Program.1cb251ec")"
- Line 493: name="t("auto.DeveloperTools.b068931c")"
- Line 521: className="t("auto.UserFormModal.99c483e1")"
- Line 492: type="t("auto.Program.1cb251ec")"
- Line 560: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 561: name="t("auto.TemplateBuilder.7f7875e6")"
- Line 587: fill="t("auto.ConfirmationModal.334c4a4c")"
- Line 588: className="t("auto.CreateField.a59f9c1e")"
- Line 589: className="t("auto.CreateField.f15d6b21")"
- Line 589: fill="t("auto.ConfirmationModal.be92d077")"
- Line 595: className="t("auto.DeveloperTools.26d39cea")"
- Line 486: className="t("auto.CreateField.028d2a3b")"
- Line 622: className="t("auto.AdminUsers.ff88093a")"
- Line 638: className="t("auto.TemplateBuilder.f8d822a6")"
- Line 595: className="t("auto.DeveloperTools.26d39cea")"
- Line 587: fill="t("auto.ConfirmationModal.334c4a4c")"
- Line 588: className="t("auto.CreateField.a59f9c1e")"
- Line 589: className="t("auto.CreateField.f15d6b21")"
- Line 589: fill="t("auto.ConfirmationModal.be92d077")"
- Line 595: className="t("auto.DeveloperTools.26d39cea")"

#### Icon Positioning
- Line 669: Icon that may need RTL mirroring: <Plus size={16} className="t("auto.DeveloperTools.26d39cea")" />


### pages\Login.tsx

#### Hardcoded Text
- Line 4: /LanguageContext'
- Line 5: TrendingUp,
- Line 5: EyeOff,
- Line 5: Globe }
- Line 6: /AuthContext'
- Line 16: .FormEvent)
- Line 28: Language Toggle *
- Line 35: <Globe size=
- Line 49: .UserFormModal.
- Line 49: .UserFormModal.
- Line 49: .UserFormModal.
- Line 68: .Program.
- Line 49: .UserFormModal.
- Line 76: <EyeOff size=
- Line 76: <Eye size=
- Line 49: .UserFormModal.

#### Incorrect Translation Key Usage
- Line 48: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 49: htmlFor="t("auto.UserFormModal.0c83f57c")"
- Line 53: id="t("auto.UserFormModal.0c83f57c")"
- Line 54: type="t("auto.UserFormModal.0c83f57c")"
- Line 75: type="t("auto.UserFormModal.ce50a093")"
- Line 81: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 89: type="t("auto.UserFormModal.c79bdf42")"


### pages\MyAnalyses.tsx

#### Hardcoded Text
- Line 3: /LanguageContext'
- Line 4: Download,
- Line 4: Calendar }
- Line 6: MyAnalysis }
- Line 12: Medium:
- Line 16: AnalysisCard:
- Line 16: MyAnalysis;
- Line 21: Show loading indicator
- Line 27: Get the full analysis data
- Line 31: Create a temporary HTML element to render the PDF content
- Line 40: Add content to the temporary element
- Line 56: 'Medium'
- Line 109: Add the element to the document
- Line 112: Generate PDF using
- Line 123: Add some margins
- Line 126: Add content image
- Line 129: Save the PDF
- Line 132: Clean up
- Line 135: Restore button text
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .CreateField.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 140: 'Error generating PDF:
- Line 135: Restore button text
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .CreateField.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 158: .Dashboard.
- Line 168: <Calendar size=
- Line 137: .MyAnalyses.
- Line 188: <Download size=
- Line 195: MyAnalyses:
- Line 198: <MyAnalysis[
- Line 217: 'Failed to fetch analyses:
- Line 228: .AdminLayout.
- Line 228: .AdminLayout.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .CreateField.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .CreateField.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 137: .MyAnalyses.
- Line 270: <AnalysisCard key=
- Line 278: MyAnalyses;

#### Incorrect Translation Key Usage
- Line 158: className="t("auto.Dashboard.abec3686")"
- Line 186: aria-label="t("auto.MyAnalyses.d4700d2c")"
- Line 228: className="t("auto.AdminLayout.6adb5be9")"
- Line 228: className="t("auto.AdminLayout.6adb5be9")"

#### Icon Positioning
- Line 168: Icon that may need RTL mirroring: <Calendar size={14} />
- Line 188: Icon that may need RTL mirroring: <Download size={18} />


### pages\NewAnalysis.tsx

#### Hardcoded Text
- Line 2: /AnalysisContext'
- Line 4: /LanguageContext'
- Line 5: ArrowLeft,
- Line 12: ConfirmationModal from '
- Line 12: /ConfirmationModal'
- Line 15: NewAnalysis:
- Line 23: Template name to translation key mapping
- Line 25: 'AI Business Idea Validator'
- Line 26: -Powered SWOT &
- Line 26: PESTEL Builder'
- Line 27: 'AI Pitch Deck Generator'
- Line 28: 'Building the Marketing Plan'
- Line 29: 'Financial Performance Assessment'
- Line 30: 'Assessing Growth Readiness'
- Line 31: 'Gap Analysis'
- Line 32: 'AI Business Health Check'
- Line 33: 'Digital Maturity Assessment'
- Line 34: -Based Market Opportunity Analyzer'
- Line 37: Template description to translation key mapping
- Line 39: 'Validate your business idea with AI-
- Line 40: 'Comprehensive SWOT and PESTEL analysis to evaluate your business strengths,
- Line 41: 'Create a professional investor pitch deck with market analysis,
- Line 42: 'Develop a comprehensive marketing strategy covering target audience,
- Line 43: 'Comprehensive financial performance analysis to identify strengths,
- Line 44: 'Evaluate your organization\
- Line 45: 'Identify gaps between current performance and desired goals across all areas of your business.
- Line 46: 'Comprehensive business health check covering financial,
- Line 47: 'Assess your organization\
- Line 48: 'Analyze potential market opportunities focusing on trends,
- Line 51: Move steps array inside the component
- Line 72: 'Invalid template ID'
- Line 75: 'Failed to fetch template data:
- Line 76: Fallback to generic values
- Line 110: A real app would have robust validation here
- Line 114: Optional:
- Line 130: 'Business Analysis'
- Line 131: 'Comprehensive business analysis'
- Line 137: <ArrowLeft size=
- Line 144: Sticky Progress Header *
- Line 158: <Check size=
- Line 175: <Save size=
- Line 189: <ConfirmationModal onCancel=
- Line 194: NewAnalysis;

#### Icon Positioning
- Line 137: Icon that may need RTL mirroring: <ArrowLeft size={16} />


### pages\Notifications.tsx

#### Hardcoded Text
- Line 2: /AuthContext'
- Line 3: CheckCircle,
- Line 3: AlertCircle,
- Line 3: AlertTriangle,
- Line 3: CheckCheck }
- Line 6: Notification {
- Line 16: Notifications:
- Line 18: <Notification[
- Line 18: <Notification[
- Line 41: 'Failed to fetch notifications:
- Line 42: 'Failed to load notifications'
- Line 63: 'Failed to mark notification as read:
- Line 82: 'Failed to mark all notifications as read:
- Line 90: 'DELETE'
- Line 103: 'Failed to delete notification:
- Line 110: Poll for new notifications every
- Line 116: Update time displays every
- Line 119: Force a re-
- Line 121: Update every
- Line 157: Check if date is valid
- Line 159: .Notifications.
- Line 159: .Notifications.
- Line 167: Log for debugging
- Line 170: Less than a minute
- Line 159: .Notifications.
- Line 177: Less than an hour
- Line 184: Less than a day
- Line 159: .Notifications.
- Line 159: .Notifications.
- Line 196: Less than a week
- Line 201: More than a week -
- Line 225: Notifications
- Line 239: .ConfirmationModal.
- Line 240: Mark all as read
- Line 247: .NotificationDropdown.
- Line 247: .NotificationDropdown.
- Line 247: .NotificationDropdown.
- Line 239: .ConfirmationModal.
- Line 159: .Notifications.
- Line 239: .ConfirmationModal.
- Line 310: View Details →
- Line 323: Notifications;

#### Incorrect Translation Key Usage
- Line 239: className="t("auto.ConfirmationModal.1bbd1cd2")"
- Line 247: className="t("auto.NotificationDropdown.5f55995a")"
- Line 252: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 272: className="t("auto.NotificationDropdown.8446247d")"
- Line 290: title="t("auto.NotificationDropdown.58111686")"
- Line 239: className="t("auto.ConfirmationModal.1bbd1cd2")"
- Line 298: title="t("auto.Notifications.5bb31a11")"
- Line 239: className="t("auto.ConfirmationModal.1bbd1cd2")"


### pages\Profile.tsx

#### Hardcoded Text
- Line 2: /AuthContext'
- Line 3: AlertCircle,
- Line 3: CheckCircle }
- Line 6: ProfileData {
- Line 14: Profile:
- Line 16: <ProfileData>
- Line 37: <HTMLInputElement>
- Line 49: 'Name is required'
- Line 53: 'Email is required'
- Line 55: 'Email is invalid'
- Line 60: 'Current password is required to set a new password'
- Line 63: 'New password must be at least
- Line 66: 'Passwords do not match'
- Line 71: Object.
- Line 74: .FormEvent)
- Line 102: Update session storage with new user data
- Line 106: 'Profile updated successfully!
- Line 108: Clear password fields
- Line 116: If password was changed,
- Line 119: 'Password changed successfully!
- Line 119: Please login again with your new password.
- Line 124: 'Failed to update profile:
- Line 127: .Profile.
- Line 136: .ConfirmationModal.
- Line 148: .NotificationDropdown.
- Line 148: .NotificationDropdown.
- Line 158: Personal Information *
- Line 168: .Program.
- Line 169: .DeveloperTools.
- Line 127: .Profile.
- Line 188: .UserFormModal.
- Line 188: .UserFormModal.
- Line 127: .Profile.
- Line 127: .Profile.
- Line 204: 'Administrator'
- Line 210: Change Password *
- Line 218: Current Password
- Line 127: .Profile.
- Line 127: .Profile.
- Line 238: New Password
- Line 127: .Profile.
- Line 258: Confirm New Password
- Line 127: .Profile.
- Line 127: .Profile.
- Line 277: Submit Button *
- Line 188: .UserFormModal.
- Line 136: .ConfirmationModal.
- Line 285: 'Saving.
- Line 285: 'Save Changes'
- Line 294: Profile;

#### Incorrect Translation Key Usage
- Line 136: className="t("auto.ConfirmationModal.830a1afa")"
- Line 148: className="t("auto.NotificationDropdown.5f55995a")"
- Line 148: className="t("auto.NotificationDropdown.5f55995a")"
- Line 161: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 168: type="t("auto.Program.1cb251ec")"
- Line 169: name="t("auto.DeveloperTools.b068931c")"
- Line 175: placeholder="t("auto.Profile.fd2f8205")"
- Line 188: type="t("auto.UserFormModal.0c83f57c")"
- Line 189: name="t("auto.UserFormModal.0c83f57c")"
- Line 195: placeholder="t("auto.Profile.95d3fa6b")"
- Line 202: className="t("auto.Profile.b426d0ce")"
- Line 161: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 222: name="t("auto.Profile.46a3937e")"
- Line 228: placeholder="t("auto.Profile.85f95286")"
- Line 242: name="t("auto.Profile.14a88b9d")"
- Line 248: placeholder="t("profile.minCharacters")"
- Line 262: name="t("auto.Profile.dfd6a38c")"
- Line 268: placeholder="t("auto.Profile.6ab96a5d")"
- Line 280: type="t("auto.UserFormModal.c79bdf42")"
- Line 284: className="t("auto.ConfirmationModal.1bbd1cd2")"


### pages\Report.tsx

#### Hardcoded Text
- Line 3: ArrowLeft,
- Line 3: Download,
- Line 3: CheckCircle,
- Line 3: TrendingUp,
- Line 3: Shield,
- Line 3: AlertTriangle,
- Line 3: DollarSign,
- Line 3: Target,
- Line 3: Lightbulb }
- Line 4: LineChart,
- Line 4: BarChart,
- Line 4: PieChart,
- Line 4: CartesianGrid,
- Line 4: Tooltip,
- Line 4: Legend,
- Line 4: ResponsiveContainer,
- Line 4: RadarChart,
- Line 4: PolarGrid,
- Line 4: PolarAngleAxis,
- Line 4: PolarRadiusAxis,
- Line 4: Radar }
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 10: RiskLevel =
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 10: 'Critical'
- Line 12: COLORS =
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 18: Critical:
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 26: Report:
- Line 29: 'Executive Summary'
- Line 32: <HTMLDivElement>
- Line 44: 'Failed to load report'
- Line 55: Enable PDF export mode
- Line 58: Wait for re-
- Line 59: Promise(
- Line 64: Create PDF
- Line 76: Add some margins
- Line 79: Start position with some top margin
- Line 81: Add title page
- Line 83: 'Business Analysis Report'
- Line 86: 'Untitled Report'
- Line 89: `Generated on:
- Line 9: .Report.
- Line 94: Add content image on next page
- Line 97: Add content image
- Line 99: Content fits on one page
- Line 102: Content spans multiple pages
- Line 106: Add new pages if content is taller than one page
- Line 115: Save the PDF
- Line 116: `Business-
- Line 116: -Report-
- Line 118: 'Error generating PDF:
- Line 119: 'Failed to generate PDF.
- Line 119: Please try again.
- Line 121: Disable PDF export mode
- Line 126: Generate dynamic financial projections based on AI data
- Line 130: Starting revenue assumption
- Line 131: Growth based on success rate
- Line 132: Profit margin from ROI
- Line 137: Decreasing expense ratio
- Line 151: Generate risk assessment data
- Line 9: .Report.
- Line 9: .Report.
- Line 160: RiskLevel]
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 190: Generate recommendations based on AI analysis
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 203: Generate benchmarks data
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 160: RiskLevel]
- Line 9: .Report.
- Line 9: .Report.
- Line 245: In PDF export mode,
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 307: -Year Revenue &
- Line 132: Profit
- Line 308: <ResponsiveContainer width=
- Line 309: <LineChart data=
- Line 310: <CartesianGrid strokeDasharray=
- Line 9: .Report.
- Line 311: <XAxis dataKey=
- Line 9: .Report.
- Line 312: <YAxis tickFormatter=
- Line 313: <Tooltip
- Line 317: <Legend /
- Line 318: <Line type=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 318: <Line type=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 318: <Line type=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 321: /LineChart>
- Line 322: /ResponsiveContainer>
- Line 131: Growth
- Line 308: <ResponsiveContainer width=
- Line 359: <BarChart data=
- Line 310: <CartesianGrid strokeDasharray=
- Line 311: <XAxis dataKey=
- Line 9: .Report.
- Line 312: <YAxis tickFormatter=
- Line 363: <Tooltip formatter=
- Line 364: <Bar dataKey=
- Line 9: .Report.
- Line 9: .Report.
- Line 365: /BarChart>
- Line 322: /ResponsiveContainer>
- Line 308: <ResponsiveContainer width=
- Line 359: <BarChart data=
- Line 310: <CartesianGrid strokeDasharray=
- Line 311: <XAxis dataKey=
- Line 9: .Report.
- Line 312: <YAxis tickFormatter=
- Line 363: <Tooltip formatter=
- Line 364: <Bar dataKey=
- Line 9: .Report.
- Line 9: .Report.
- Line 365: /BarChart>
- Line 322: /ResponsiveContainer>
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 83: Analysis
- Line 308: <ResponsiveContainer width=
- Line 391: <RadarChart data=
- Line 392: <PolarGrid stroke=
- Line 9: .Report.
- Line 393: <PolarAngleAxis dataKey=
- Line 9: .Report.
- Line 394: <PolarRadiusAxis angle=
- Line 395: <Radar name=
- Line 9: .Report.
- Line 9: .Report.
- Line 396: <Tooltip /
- Line 397: /RadarChart>
- Line 322: /ResponsiveContainer>
- Line 400: .CreateField.
- Line 9: .Report.
- Line 160: RiskLevel]
- Line 160: RiskLevel]
- Line 160: RiskLevel]
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 438: .TemplateBuilder.
- Line 9: .Report.
- Line 9: .Report.
- Line 446: PRIORITY
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 505: Excellent!
- Line 505: You are performing at top tier level.
- Line 506: You are above industry average.
- Line 9: .Report.
- Line 472: Performance
- Line 308: <ResponsiveContainer width=
- Line 359: <BarChart data=
- Line 310: <CartesianGrid strokeDasharray=
- Line 311: <XAxis dataKey=
- Line 518: .DeveloperTools.
- Line 9: .Report.
- Line 519: <YAxis stroke=
- Line 396: <Tooltip /
- Line 317: <Legend /
- Line 364: <Bar dataKey=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 364: <Bar dataKey=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 364: <Bar dataKey=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 365: /BarChart>
- Line 322: /ResponsiveContainer>
- Line 534: Normal tab-
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 307: -Year Revenue &
- Line 132: Profit
- Line 308: <ResponsiveContainer width=
- Line 309: <LineChart data=
- Line 310: <CartesianGrid strokeDasharray=
- Line 9: .Report.
- Line 311: <XAxis dataKey=
- Line 9: .Report.
- Line 312: <YAxis tickFormatter=
- Line 313: <Tooltip
- Line 317: <Legend /
- Line 318: <Line type=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 318: <Line type=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 318: <Line type=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 321: /LineChart>
- Line 322: /ResponsiveContainer>
- Line 131: Growth
- Line 308: <ResponsiveContainer width=
- Line 359: <BarChart data=
- Line 310: <CartesianGrid strokeDasharray=
- Line 311: <XAxis dataKey=
- Line 9: .Report.
- Line 312: <YAxis tickFormatter=
- Line 363: <Tooltip formatter=
- Line 364: <Bar dataKey=
- Line 9: .Report.
- Line 9: .Report.
- Line 365: /BarChart>
- Line 322: /ResponsiveContainer>
- Line 308: <ResponsiveContainer width=
- Line 359: <BarChart data=
- Line 310: <CartesianGrid strokeDasharray=
- Line 311: <XAxis dataKey=
- Line 9: .Report.
- Line 312: <YAxis tickFormatter=
- Line 363: <Tooltip formatter=
- Line 364: <Bar dataKey=
- Line 9: .Report.
- Line 9: .Report.
- Line 365: /BarChart>
- Line 322: /ResponsiveContainer>
- Line 9: .Report.
- Line 9: .Report.
- Line 83: Analysis
- Line 308: <ResponsiveContainer width=
- Line 391: <RadarChart data=
- Line 392: <PolarGrid stroke=
- Line 9: .Report.
- Line 393: <PolarAngleAxis dataKey=
- Line 9: .Report.
- Line 394: <PolarRadiusAxis angle=
- Line 395: <Radar name=
- Line 9: .Report.
- Line 9: .Report.
- Line 396: <Tooltip /
- Line 397: /RadarChart>
- Line 322: /ResponsiveContainer>
- Line 400: .CreateField.
- Line 9: .Report.
- Line 160: RiskLevel]
- Line 160: RiskLevel]
- Line 160: RiskLevel]
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 438: .TemplateBuilder.
- Line 9: .Report.
- Line 9: .Report.
- Line 446: PRIORITY
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 505: Excellent!
- Line 505: You are performing at top tier level.
- Line 506: You are above industry average.
- Line 9: .Report.
- Line 472: Performance
- Line 308: <ResponsiveContainer width=
- Line 359: <BarChart data=
- Line 310: <CartesianGrid strokeDasharray=
- Line 311: <XAxis dataKey=
- Line 518: .DeveloperTools.
- Line 9: .Report.
- Line 519: <YAxis stroke=
- Line 396: <Tooltip /
- Line 317: <Legend /
- Line 364: <Bar dataKey=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 364: <Bar dataKey=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 364: <Bar dataKey=
- Line 9: .Report.
- Line 9: .Report.
- Line 9: .Report.
- Line 365: /BarChart>
- Line 322: /ResponsiveContainer>
- Line 807: Add loading and error handling
- Line 830: .ElementType}
- Line 9: .Report.
- Line 831: Award }
- Line 9: .Report.
- Line 832: TrendingUp }
- Line 9: .Report.
- Line 833: Shield }
- Line 9: .Report.
- Line 9: .Report.
- Line 838: StatCard =
- Line 838: .ElementType,
- Line 9: .Report.
- Line 9: .Report.
- Line 856: <ArrowLeft size=
- Line 856: Back to Analyses
- Line 861: Analysis Report •
- Line 863: .AdminLogs.
- Line 864: <Download size=
- Line 864: Export
- Line 9: .Report.
- Line 877: <StatCard title=
- Line 877: {CheckCircle}
- Line 877: <StatCard title=
- Line 878: {Shield}
- Line 877: <StatCard title=
- Line 879: {TrendingUp}
- Line 877: <StatCard title=
- Line 905: Report;

#### Incorrect Translation Key Usage
- Line 248: className="t("auto.Report.c219ab9c")"
- Line 252: className="t("auto.Report.ae382999")"
- Line 252: className="t("auto.Report.ae382999")"
- Line 310: stroke="t("auto.Report.0d9646ba")"
- Line 311: dataKey="t("auto.Report.84cdc76c")"
- Line 318: type="t("auto.Report.615d163c")"
- Line 318: dataKey="t("auto.Report.67362dfb")"
- Line 318: stroke="t("auto.Report.c8a0f540")"
- Line 318: name="t("auto.Report.54358a91")"
- Line 318: type="t("auto.Report.615d163c")"
- Line 319: dataKey="t("auto.Report.603af891")"
- Line 319: stroke="t("auto.Report.681f8cc7")"
- Line 319: name="t("auto.Report.13495828")"
- Line 318: type="t("auto.Report.615d163c")"
- Line 320: dataKey="t("auto.Report.8cb55412")"
- Line 320: stroke="t("auto.Report.056051c1")"
- Line 320: name="t("auto.Report.182875b6")"
- Line 311: dataKey="t("auto.Report.84cdc76c")"
- Line 318: dataKey="t("auto.Report.67362dfb")"
- Line 364: fill="t("auto.Report.c8a0f540")"
- Line 311: dataKey="t("auto.Report.84cdc76c")"
- Line 320: dataKey="t("auto.Report.8cb55412")"
- Line 376: fill="t("auto.Report.056051c1")"
- Line 252: className="t("auto.Report.ae382999")"
- Line 310: stroke="t("auto.Report.0d9646ba")"
- Line 393: dataKey="t("auto.Report.c6142b27")"
- Line 395: name="t("report.riskLevel")"
- Line 319: stroke="t("auto.Report.681f8cc7")"
- Line 395: fill="t("auto.Report.681f8cc7")"
- Line 400: className="t("auto.CreateField.028d2a3b")"
- Line 252: className="t("auto.Report.ae382999")"
- Line 430: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 438: className="t("auto.TemplateBuilder.f8d822a6")"
- Line 456: className="t("auto.Report.7335a003")"
- Line 252: className="t("auto.Report.ae382999")"
- Line 430: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 518: dataKey="t("auto.DeveloperTools.b068931c")"
- Line 518: textAnchor="t("auto.Report.7f021a14")"
- Line 522: dataKey="t("auto.Report.31057e9b")"
- Line 364: fill="t("auto.Report.c8a0f540")"
- Line 522: name="t("auto.Report.c1572799")"
- Line 523: dataKey="t("auto.Report.67125694")"
- Line 523: fill="t("auto.Report.53990c72")"
- Line 523: name="t("auto.Report.29312841")"
- Line 524: dataKey="t("auto.Report.6ffbd378")"
- Line 376: fill="t("auto.Report.056051c1")"
- Line 524: name="t("auto.Report.a95ec5cf")"
- Line 252: className="t("auto.Report.ae382999")"
- Line 252: className="t("auto.Report.ae382999")"
- Line 310: stroke="t("auto.Report.0d9646ba")"
- Line 311: dataKey="t("auto.Report.84cdc76c")"
- Line 318: type="t("auto.Report.615d163c")"
- Line 318: dataKey="t("auto.Report.67362dfb")"
- Line 318: stroke="t("auto.Report.c8a0f540")"
- Line 318: name="t("auto.Report.54358a91")"
- Line 318: type="t("auto.Report.615d163c")"
- Line 319: dataKey="t("auto.Report.603af891")"
- Line 319: stroke="t("auto.Report.681f8cc7")"
- Line 319: name="t("auto.Report.13495828")"
- Line 318: type="t("auto.Report.615d163c")"
- Line 320: dataKey="t("auto.Report.8cb55412")"
- Line 320: stroke="t("auto.Report.056051c1")"
- Line 320: name="t("auto.Report.182875b6")"
- Line 311: dataKey="t("auto.Report.84cdc76c")"
- Line 318: dataKey="t("auto.Report.67362dfb")"
- Line 364: fill="t("auto.Report.c8a0f540")"
- Line 311: dataKey="t("auto.Report.84cdc76c")"
- Line 320: dataKey="t("auto.Report.8cb55412")"
- Line 376: fill="t("auto.Report.056051c1")"
- Line 252: className="t("auto.Report.ae382999")"
- Line 310: stroke="t("auto.Report.0d9646ba")"
- Line 393: dataKey="t("auto.Report.c6142b27")"
- Line 395: name="t("report.riskLevel")"
- Line 319: stroke="t("auto.Report.681f8cc7")"
- Line 395: fill="t("auto.Report.681f8cc7")"
- Line 400: className="t("auto.CreateField.028d2a3b")"
- Line 252: className="t("auto.Report.ae382999")"
- Line 430: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 438: className="t("auto.TemplateBuilder.f8d822a6")"
- Line 456: className="t("auto.Report.7335a003")"
- Line 252: className="t("auto.Report.ae382999")"
- Line 430: className="t("auto.Step1_BasicInfo.eeefd75c")"
- Line 518: dataKey="t("auto.DeveloperTools.b068931c")"
- Line 518: textAnchor="t("auto.Report.7f021a14")"
- Line 522: dataKey="t("auto.Report.31057e9b")"
- Line 364: fill="t("auto.Report.c8a0f540")"
- Line 522: name="t("auto.Report.c1572799")"
- Line 523: dataKey="t("auto.Report.67125694")"
- Line 523: fill="t("auto.Report.53990c72")"
- Line 523: name="t("auto.Report.29312841")"
- Line 524: dataKey="t("auto.Report.6ffbd378")"
- Line 376: fill="t("auto.Report.056051c1")"
- Line 524: name="t("auto.Report.a95ec5cf")"
- Line 863: className="t("auto.AdminLogs.9edfbb10")"
- Line 877: title="t("report.successProbability")"
- Line 878: title="t("report.riskLevel")"
- Line 879: title="t("report.projectedROI")"
- Line 880: title="t("report.investment")"

#### Icon Positioning
- Line 856: Icon that may need RTL mirroring: <ArrowLeft size={16} />
- Line 864: Icon that may need RTL mirroring: <Download size={16} />


### pages\SignUp.tsx

#### Hardcoded Text
- Line 4: /LanguageContext'
- Line 5: TrendingUp,
- Line 5: EyeOff,
- Line 5: Globe }
- Line 7: SignUp:
- Line 26: .FormEvent)
- Line 43: Language Toggle *
- Line 50: <Globe size=
- Line 60: .SignUp.
- Line 60: .SignUp.
- Line 61: .Program.
- Line 64: .UserFormModal.
- Line 64: .UserFormModal.
- Line 64: .UserFormModal.
- Line 61: .Program.
- Line 64: .UserFormModal.
- Line 70: <EyeOff size=
- Line 70: <Eye size=
- Line 81: .Profile.
- Line 81: .Profile.
- Line 61: .Program.
- Line 64: .UserFormModal.
- Line 70: <EyeOff size=
- Line 70: <Eye size=
- Line 85: .AdminLayout.
- Line 64: .UserFormModal.
- Line 106: SignUp;

#### Incorrect Translation Key Usage
- Line 59: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 60: htmlFor="t("auto.SignUp.a0fbf479")"
- Line 61: id="t("auto.SignUp.a0fbf479")"
- Line 61: type="t("auto.Program.1cb251ec")"
- Line 59: className="t("auto.Step1_BasicInfo.b42cd24b")"
- Line 64: htmlFor="t("auto.UserFormModal.0c83f57c")"
- Line 65: id="t("auto.UserFormModal.0c83f57c")"
- Line 65: type="t("auto.UserFormModal.0c83f57c")"
- Line 70: type="t("auto.UserFormModal.ce50a093")"
- Line 81: htmlFor="t("auto.Profile.dfd6a38c")"
- Line 82: id="t("auto.Profile.dfd6a38c")"
- Line 70: type="t("auto.UserFormModal.ce50a093")"
- Line 85: className="t("auto.AdminLayout.b10df59b")"
- Line 87: type="t("auto.Step1_BasicInfo.9fced129")"
- Line 91: type="t("auto.UserFormModal.c79bdf42")"


### pages\Templates.tsx

#### Hardcoded Text
- Line 3: /LanguageContext'
- Line 5: Utensils,
- Line 5: ShoppingCart,
- Line 5: Rocket,
- Line 5: Dumbbell,
- Line 5: ArrowRight,
- Line 6: CheckCircle,
- Line 6: BarChart,
- Line 6: Wrench,
- Line 6: Target,
- Line 6: Shield,
- Line 6: Lightbulb,
- Line 6: FileText,
- Line 7: TrendingUp,
- Line 7: Database,
- Line 9: /AnalysisContext'
- Line 10: Template }
- Line 12: Icon mapping for categories
- Line 14: .Templates.
- Line 5: Utensils,
- Line 14: .Templates.
- Line 5: ShoppingCart,
- Line 14: .Templates.
- Line 5: Dumbbell,
- Line 14: .Templates.
- Line 5: Rocket,
- Line 14: .Templates.
- Line 6: CheckCircle,
- Line 19: PESTEL'
- Line 6: BarChart,
- Line 14: .Templates.
- Line 6: Target,
- Line 14: .Templates.
- Line 7: TrendingUp,
- Line 14: .Templates.
- Line 7: TrendingUp,
- Line 14: .Templates.
- Line 6: Wrench,
- Line 14: .Templates.
- Line 6: Shield,
- Line 14: .Templates.
- Line 7: Database,
- Line 14: .Templates.
- Line 6: FileText,
- Line 14: .Templates.
- Line 14: .Templates.
- Line 31: Icon mapping for specific templates
- Line 14: .Templates.
- Line 6: CheckCircle,
- Line 14: .Templates.
- Line 6: BarChart,
- Line 14: .Templates.
- Line 6: Target,
- Line 14: .Templates.
- Line 7: TrendingUp,
- Line 14: .Templates.
- Line 14: .Templates.
- Line 6: Wrench,
- Line 14: .Templates.
- Line 6: Shield,
- Line 14: .Templates.
- Line 7: Database,
- Line 14: .Templates.
- Line 6: FileText,
- Line 14: .Templates.
- Line 45: Template name to translation key mapping
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 14: .Templates.
- Line 59: Template description to translation key mapping
- Line 61: 'Validate your business idea with AI-
- Line 62: 'Comprehensive SWOT and PESTEL analysis to evaluate your business strengths,
- Line 63: 'Create a professional investor pitch deck with market analysis,
- Line 64: 'Develop a comprehensive marketing strategy covering target audience,
- Line 14: .Templates.
- Line 64: )PlanDesc'
- Line 65: 'Comprehensive financial performance analysis to identify strengths,
- Line 66: 'Evaluate your organization\
- Line 14: .Templates.
- Line 14: .Templates.
- Line 67: 'Identify gaps between current performance and desired goals across all areas of your business.
- Line 68: 'Comprehensive business health check covering financial,
- Line 69: 'Assess your organization\
- Line 70: 'Analyze potential market opportunities focusing on trends,
- Line 73: TemplateCard:
- Line 73: Template;
- Line 77: Get translated name and description if available
- Line 83: Convert to string as expected by AnalysisContext
- Line 87: Get icon based on template name,
- Line 88: IconComponent =
- Line 88: Rocket;
- Line 92: <Star size=
- Line 99: <Clock size=
- Line 99: .DeveloperTools.
- Line 103: <ArrowRight size=
- Line 109: Templates:
- Line 111: <Template[
- Line 122: 'Failed to fetch templates:
- Line 123: 'Failed to load templates.
- Line 123: Please try again later.
- Line 132: Group templates by category
- Line 173: <TemplateCard key=
- Line 173: <TemplateCard key=
- Line 196: Templates;

#### Incorrect Translation Key Usage
- Line 99: className="t("auto.DeveloperTools.26d39cea")"

#### Icon Positioning
- Line 103: Icon that may need RTL mirroring: <ArrowRight size={16} />


