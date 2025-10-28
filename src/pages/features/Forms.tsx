import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '../../components/ui/alert'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Checkbox } from '../../components/ui/checkbox'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Textarea } from '../../components/ui/textarea'
import FeatureLayout from '../../components/FeatureLayout'
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  ChevronRight,
  ClipboardList,
  Clock,
  FileCheck,
  FileText,
  Home,
  Loader2,
  Plus,
  Shield,
  Upload,
  Users
} from 'lucide-react'

type FacilityStatus = 'new' | 'pending' | 'approved' | 'rejected'

type AttachmentField = 'old_license' | 'safety_plan' | 'layout_plan'

interface Facility {
  id: number
  facility_code: string
  name: string
  tax_code?: string | null
  type: string
  address: string
  legal_representative: string
  device_count: number
  device_types: string[]
  purpose?: string | null
  radiation_officer: string
  license_number?: string | null
  certificate_number?: string | null
  certificate_date?: string | null
  attachments?: Record<string, string>
  status: FacilityStatus
  created_at: string
  updated_at: string
}

interface RadiationStaff {
  id: string
  full_name: string
  role: string
  certificate: string
}

interface FacilityFormState {
  name: string
  tax_code: string
  type: string
  address: string
  legal_representative: string
  device_count: number
  device_types: string[]
  purpose: string
  install_location: string
  radiation_officer: string
  certificate_number: string
  certificate_date: string
  license_number: string
  staff: RadiationStaff[]
}

const resolveApiBaseUrl = () => {
  const fallback = 'http://localhost:3001/api'
  if (typeof window === 'undefined') {
    return fallback
  }

  const win = window as typeof window & { __APP_API_URL__?: string }
  if (typeof win.__APP_API_URL__ === 'string' && win.__APP_API_URL__.length > 0) {
    return win.__APP_API_URL__
  }

  if (typeof document !== 'undefined') {
    const meta = document.querySelector('meta[name="api-base-url"]') as HTMLMetaElement | null
    if (meta?.content) {
      return meta.content
    }
  }

  return fallback
}

const API_BASE_URL = resolveApiBaseUrl()

const createStaffMember = (): RadiationStaff => ({
  id:
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `staff-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  full_name: '',
  role: '',
  certificate: ''
})

const defaultFormState: FacilityFormState = {
  name: '',
  tax_code: '',
  type: '',
  address: '',
  legal_representative: '',
  device_count: 1,
  device_types: [],
  purpose: '',
  install_location: '',
  radiation_officer: '',
  certificate_number: '',
  certificate_date: '',
  license_number: '',
  staff: [createStaffMember()]
}

const facilityTypes = ['Y tế', 'Công nghiệp', 'Nghiên cứu', 'Giáo dục']

const deviceTypeOptions = [
  'X-quang',
  'CT Scanner',
  'PET',
  'Gamma',
  'Gia tốc tuyến tính',
  'Xạ trị Co-60'
]

const statusColors: Record<FacilityStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-rose-100 text-rose-800'
}

export default function Forms() {
  const [activeTab, setActiveTab] = useState<'create' | 'list' | 'workflow'>('create')
  const [formState, setFormState] = useState<FacilityFormState>(defaultFormState)
  const [attachments, setAttachments] = useState<Record<AttachmentField, File | null>>({
    old_license: null,
    safety_plan: null,
    layout_plan: null
  })
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [approveLoading, setApproveLoading] = useState<number | null>(null)
  const [statusUpdating, setStatusUpdating] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [statusNotes, setStatusNotes] = useState<Record<number, string>>({})

  const fetchFacilities = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/facility`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Không thể tải danh sách hồ sơ từ máy chủ.')
      }
      const data: Facility[] = await response.json()
      setFacilities(data)
    } catch (err) {
      console.error(err)
      setError('Không thể kết nối tới API NestJS. Vui lòng kiểm tra server backend (cổng 3001).')
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFacilities()
  }, [fetchFacilities])

  const stats = useMemo(() => {
    const total = facilities.length
    const pending = facilities.filter((f) => f.status === 'pending').length
    const approved = facilities.filter((f) => f.status === 'approved').length
    const rejected = facilities.filter((f) => f.status === 'rejected').length
    return { total, pending, approved, rejected }
  }, [facilities])

  const handleStaffChange = (id: string, key: keyof RadiationStaff, value: string) => {
    setFormState((prev) => ({
      ...prev,
      staff: prev.staff.map((member) =>
        member.id === id
          ? {
              ...member,
              [key]: value
            }
          : member
      )
    }))
  }

  const addStaffRow = () => {
    setFormState((prev) => ({
      ...prev,
      staff: [...prev.staff, createStaffMember()]
    }))
  }

  const removeStaffRow = (id: string) => {
    setFormState((prev) => ({
      ...prev,
      staff: prev.staff.length > 1 ? prev.staff.filter((member) => member.id !== id) : prev.staff
    }))
  }

  const handleDeviceTypeToggle = (device: string, checked: boolean) => {
    setFormState((prev) => ({
      ...prev,
      device_types: checked
        ? [...prev.device_types, device]
        : prev.device_types.filter((item) => item !== device)
    }))
  }

  const resetForm = () => {
    setFormState({
      ...defaultFormState,
      staff: [createStaffMember()]
    })
    setAttachments({
      old_license: null,
      safety_plan: null,
      layout_plan: null
    })
  }

  const uploadAttachment = async (field: AttachmentField, file: File | null) => {
    if (!file) return undefined
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await fetch(`${API_BASE_URL}/files/${field}`, {
        method: 'POST',
        body: formData
      })
      if (!response.ok) {
        throw new Error('Upload thất bại')
      }
      const data = await response.json()
      return (data?.url as string | undefined) ?? (data?.path as string | undefined) ?? file.name
    } catch (err) {
      console.warn(`Upload ${field} thất bại, sử dụng tên file cục bộ.`, err)
      return file.name
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const [oldLicenseUrl, safetyPlanUrl, layoutPlanUrl] = await Promise.all([
        uploadAttachment('old_license', attachments.old_license),
        uploadAttachment('safety_plan', attachments.safety_plan),
        uploadAttachment('layout_plan', attachments.layout_plan)
      ])

      const attachmentsPayload: Record<string, string> = {}
      if (oldLicenseUrl) attachmentsPayload.old_license = oldLicenseUrl
      if (safetyPlanUrl) attachmentsPayload.safety_plan = safetyPlanUrl
      if (layoutPlanUrl) attachmentsPayload.layout_plan = layoutPlanUrl
      if (formState.install_location) attachmentsPayload.install_location = formState.install_location
      if (formState.staff.some((member) => member.full_name.trim())) {
        attachmentsPayload.staff_roster = JSON.stringify(
          formState.staff.filter((member) => member.full_name.trim())
        )
      }

      const payload = {
        name: formState.name,
        tax_code: formState.tax_code || undefined,
        type: formState.type,
        address: formState.address,
        legal_representative: formState.legal_representative,
        device_count: Number(formState.device_count),
        device_types: formState.device_types,
        purpose: formState.purpose || undefined,
        radiation_officer: formState.radiation_officer,
        license_number: formState.license_number || undefined,
        certificate_number: formState.certificate_number || undefined,
        certificate_date: formState.certificate_date || undefined,
        attachments: Object.keys(attachmentsPayload).length > 0 ? attachmentsPayload : undefined,
        status: 'pending' as FacilityStatus
      }

      const response = await fetch(`${API_BASE_URL}/facility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Không thể tạo hồ sơ mới. Kiểm tra dữ liệu nhập vào hoặc API backend.')
      }

      const createdFacility: Facility = await response.json()
      setFacilities((prev) => [createdFacility, ...prev])
      setSuccess('Tạo hồ sơ cơ sở thành công. Hồ sơ đang chờ duyệt.')
      resetForm()
      setActiveTab('list')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tạo hồ sơ cơ sở.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleApprove = async (facility: Facility) => {
    setApproveLoading(facility.id)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch(`${API_BASE_URL}/facility/${facility.id}/approve`, {
        method: 'PATCH'
      })
      if (!response.ok) {
        throw new Error('Không thể phê duyệt hồ sơ. Vui lòng kiểm tra backend.')
      }
      const updated = await response.json()
      setFacilities((prev) => prev.map((item) => (item.id === facility.id ? updated : item)))
      setSuccess(`Hồ sơ ${facility.facility_code} đã được phê duyệt.`)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Phê duyệt hồ sơ thất bại.')
    } finally {
      setApproveLoading(null)
    }
  }

  const handleStatusUpdate = async (facility: Facility, status: FacilityStatus) => {
    setStatusUpdating(facility.id)
    setError(null)
    setSuccess(null)
    try {
      const response = await fetch(`${API_BASE_URL}/facility/${facility.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, note: statusNotes[facility.id] || undefined })
      })
      if (!response.ok) {
        throw new Error('Không thể cập nhật trạng thái hồ sơ.')
      }
      const updated = await response.json()
      setFacilities((prev) => prev.map((item) => (item.id === facility.id ? updated : item)))
      setSuccess(`Đã cập nhật trạng thái hồ sơ ${facility.facility_code} thành ${status}.`)
      setStatusNotes((prev) => ({ ...prev, [facility.id]: '' }))
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Lỗi cập nhật trạng thái hồ sơ.')
    } finally {
      setStatusUpdating(null)
    }
  }

  const formatDate = (value?: string | null) => {
    if (!value) return '—'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return new Intl.DateTimeFormat('vi-VN').format(date)
  }

  const renderStatusBadge = (status: FacilityStatus) => (
    <Badge className={`${statusColors[status]} font-medium capitalize`}>{status}</Badge>
  )

  return (
    <FeatureLayout>
      <div className="flex items-center justify-between mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="flex items-center hover:text-gray-900 transition-colors">
            <Home className="w-4 h-4 mr-2" />
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/features" className="hover:text-gray-900 transition-colors">
            Các chức năng
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Quản lý hồ sơ cơ sở</span>
        </nav>

        <Link
          to="/features"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 text-[#004C99] hover:from-blue-100 hover:to-teal-100 transition-all duration-300 rounded-lg border border-blue-200 hover:border-blue-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Link>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#004C99] to-[#00B8B0] bg-clip-text text-transparent">
          QUẢN LÝ HỒ SƠ CƠ SỞ BỨC XẠ
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Khởi tạo, xét duyệt và theo dõi hồ sơ cơ sở bức xạ.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card className="border-blue-200 bg-white/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">Tổng hồ sơ</CardTitle>
            <FileText className="h-5 w-5 text-[#004C99]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#004C99]">{stats.total}</div>
            <CardDescription>Toàn bộ hồ sơ cơ sở trong hệ thống</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-white/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">Đang chờ duyệt</CardTitle>
            <Clock className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
            <CardDescription>Đang trong giai đoạn thẩm định</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-white/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">Đã phê duyệt</CardTitle>
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{stats.approved}</div>
            <CardDescription>Đủ điều kiện hoạt động</CardDescription>
          </CardContent>
        </Card>

        <Card className="border-rose-200 bg-white/80 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">Bị trả về</CardTitle>
            <AlertTriangle className="h-5 w-5 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-600">{stats.rejected}</div>
            <CardDescription>Yêu cầu bổ sung thông tin</CardDescription>
          </CardContent>
        </Card>
      </div>

      {(error || success) && (
        <Alert variant={error ? 'destructive' : 'default'} className="mb-8">
          {error ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          <AlertTitle>{error ? 'Có lỗi xảy ra' : 'Thành công'}</AlertTitle>
          <AlertDescription>{error ?? success}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="create">Tạo hồ sơ mới</TabsTrigger>
          <TabsTrigger value="list">Danh sách hồ sơ</TabsTrigger>
          <TabsTrigger value="workflow">Quy trình & Giám sát</TabsTrigger>
        </TabsList>

        <TabsContent value="create">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>I. Thông tin pháp lý</CardTitle>
                <CardDescription>
                  Cung cấp thông tin pháp lý chính xác để hệ thống tạo mã FACILITY_CODE tự động.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên cơ sở *</Label>
                  <Input
                    id="name"
                    value={formState.name}
                    onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                    required
                    placeholder="Bệnh viện Phạm Ngọc Thạch"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax_code">Mã số thuế</Label>
                  <Input
                    id="tax_code"
                    value={formState.tax_code}
                    onChange={(event) => setFormState((prev) => ({ ...prev, tax_code: event.target.value }))}
                    placeholder="0301234567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Loại hình hoạt động *</Label>
                  <Select
                    value={formState.type}
                    onValueChange={(value) => setFormState((prev) => ({ ...prev, type: value }))}
                    required
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Chọn loại hình" />
                    </SelectTrigger>
                    <SelectContent>
                      {facilityTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legal_representative">Đại diện pháp luật *</Label>
                  <Input
                    id="legal_representative"
                    value={formState.legal_representative}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, legal_representative: event.target.value }))
                    }
                    required
                    placeholder="Nguyễn Thị Lan"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Địa chỉ trụ sở *</Label>
                  <Textarea
                    id="address"
                    value={formState.address}
                    onChange={(event) => setFormState((prev) => ({ ...prev, address: event.target.value }))}
                    required
                    placeholder="Số 120 Hồng Bàng, Quận 5, TP.HCM"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>II. Thông tin kỹ thuật</CardTitle>
                <CardDescription>Thông tin về thiết bị bức xạ và mục đích sử dụng.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="device_count">Số lượng thiết bị *</Label>
                  <Input
                    id="device_count"
                    type="number"
                    min={1}
                    value={formState.device_count}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, device_count: Number(event.target.value) }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Loại thiết bị *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 border rounded-md">
                    {deviceTypeOptions.map((device) => {
                      const checked = formState.device_types.includes(device)
                      return (
                        <label key={device} className="flex items-center space-x-2 text-sm text-gray-700">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(value) => handleDeviceTypeToggle(device, Boolean(value))}
                          />
                          <span>{device}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="purpose">Mục đích sử dụng</Label>
                  <Textarea
                    id="purpose"
                    value={formState.purpose}
                    onChange={(event) => setFormState((prev) => ({ ...prev, purpose: event.target.value }))}
                    placeholder="Chẩn đoán hình ảnh bệnh nhân"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="install_location">Vị trí lắp đặt</Label>
                  <Input
                    id="install_location"
                    value={formState.install_location}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, install_location: event.target.value }))
                    }
                    placeholder="Khoa Chẩn đoán hình ảnh - Tầng 2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>III. Nhân sự an toàn bức xạ</CardTitle>
                <CardDescription>Thông tin người phụ trách và danh sách nhân sự bức xạ.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="radiation_officer">Người phụ trách ATBX *</Label>
                    <Input
                      id="radiation_officer"
                      value={formState.radiation_officer}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, radiation_officer: event.target.value }))
                      }
                      required
                      placeholder="Trần Văn Minh"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certificate_number">Số chứng chỉ</Label>
                    <Input
                      id="certificate_number"
                      value={formState.certificate_number}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, certificate_number: event.target.value }))
                      }
                      placeholder="AT-4567/2025"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certificate_date">Ngày cấp chứng chỉ</Label>
                    <Input
                      id="certificate_date"
                      type="date"
                      value={formState.certificate_date}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, certificate_date: event.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Nhân viên bức xạ</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addStaffRow}>
                      <Plus className="w-4 h-4 mr-2" /> Thêm nhân viên
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {formState.staff.map((member, index) => (
                      <div
                        key={member.id}
                        className="grid gap-3 md:grid-cols-[1.5fr,1fr,1fr,auto] p-3 border rounded-lg bg-gray-50"
                      >
                        <Input
                          placeholder={`Họ tên nhân viên #${index + 1}`}
                          value={member.full_name}
                          onChange={(event) => handleStaffChange(member.id, 'full_name', event.target.value)}
                        />
                        <Input
                          placeholder="Chức vụ/Bộ phận"
                          value={member.role}
                          onChange={(event) => handleStaffChange(member.id, 'role', event.target.value)}
                        />
                        <Input
                          placeholder="Mã chứng chỉ (nếu có)"
                          value={member.certificate}
                          onChange={(event) => handleStaffChange(member.id, 'certificate', event.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-rose-600"
                          onClick={() => removeStaffRow(member.id)}
                          disabled={formState.staff.length === 1}
                        >
                          Xóa
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>IV. Hồ sơ đính kèm</CardTitle>
                <CardDescription>Upload các tài liệu PDF (dưới 10MB) hoặc sơ đồ khu vực.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="old_license">Giấy phép cũ</Label>
                  <Input
                    id="old_license"
                    type="file"
                    accept=".pdf"
                    onChange={(event) =>
                      setAttachments((prev) => ({
                        ...prev,
                        old_license: event.target.files?.[0] ?? null
                      }))
                    }
                  />
                  {attachments.old_license && (
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Upload className="w-3 h-3" /> {attachments.old_license.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="safety_plan">Kế hoạch ứng phó sự cố</Label>
                  <Input
                    id="safety_plan"
                    type="file"
                    accept=".pdf"
                    onChange={(event) =>
                      setAttachments((prev) => ({
                        ...prev,
                        safety_plan: event.target.files?.[0] ?? null
                      }))
                    }
                  />
                  {attachments.safety_plan && (
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Upload className="w-3 h-3" /> {attachments.safety_plan.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="layout_plan">Sơ đồ khu vực (Image/PDF)</Label>
                  <Input
                    id="layout_plan"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(event) =>
                      setAttachments((prev) => ({
                        ...prev,
                        layout_plan: event.target.files?.[0] ?? null
                      }))
                    }
                  />
                  {attachments.layout_plan && (
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <Upload className="w-3 h-3" /> {attachments.layout_plan.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-3">
                  <Label htmlFor="license_number">Số giấy phép hiện tại (nếu có)</Label>
                  <Input
                    id="license_number"
                    value={formState.license_number}
                    onChange={(event) => setFormState((prev) => ({ ...prev, license_number: event.target.value }))}
                    placeholder="ATBXHN/2025/0234"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={resetForm} disabled={submitting}>
                Làm mới
              </Button>
              <Button type="submit" disabled={submitting} className="bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white">
                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileCheck className="w-4 h-4 mr-2" />}
                Gửi hồ sơ
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Danh sách hồ sơ đã tạo</CardTitle>
                <CardDescription>Thông tin đồng bộ từ PostgreSQL thông qua API NestJS.</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={fetchFacilities} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Activity className="w-4 h-4 mr-2" />}
                Đồng bộ dữ liệu
              </Button>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              {initialLoading ? (
                <div className="flex items-center justify-center py-10 text-gray-600">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Đang tải dữ liệu...
                </div>
              ) : facilities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600">
                  <FileText className="w-12 h-12 mb-4 text-gray-300" />
                  <p>Chưa có hồ sơ nào trong hệ thống. Hãy tạo hồ sơ mới.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {facilities.map((facility) => (
                    <Card key={facility.id} className="border border-gray-200 shadow-sm">
                      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <CardTitle className="text-lg text-gray-900">{facility.name}</CardTitle>
                          <CardDescription>
                            Mã cơ sở: <span className="font-semibold text-gray-800">{facility.facility_code}</span>
                          </CardDescription>
                        </div>
                        {renderStatusBadge(facility.status)}
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-3 text-sm text-gray-700">
                          <div>
                            <p className="font-semibold text-gray-900">Pháp lý</p>
                            <p>MST: {facility.tax_code ?? '—'}</p>
                            <p>Đại diện: {facility.legal_representative}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Thiết bị</p>
                            <p>{facility.device_count} thiết bị</p>
                            <p>{facility.device_types?.join(', ') ?? 'Không có dữ liệu'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">ATBX</p>
                            <p>Người phụ trách: {facility.radiation_officer}</p>
                            <p>Chứng chỉ: {facility.certificate_number ?? '—'}</p>
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3 text-sm text-gray-600">
                          <div>
                            <p className="font-semibold text-gray-900">Mục đích</p>
                            <p>{facility.purpose ?? '—'}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Giấy phép</p>
                            <p>{facility.license_number ?? '—'}</p>
                            <p>Ngày cấp chứng chỉ: {formatDate(facility.certificate_date)}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">Cập nhật</p>
                            <p>Tạo: {formatDate(facility.created_at)}</p>
                            <p>Sửa: {formatDate(facility.updated_at)}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(facility)}
                            disabled={approveLoading === facility.id || facility.status === 'approved'}
                          >
                            {approveLoading === facility.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Shield className="w-4 h-4 mr-2" />
                            )}
                            Phê duyệt
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(facility, 'rejected')}
                            disabled={statusUpdating === facility.id}
                          >
                            {statusUpdating === facility.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 mr-2" />
                            )}
                            Trả về bổ sung
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(facility, 'pending')}
                            disabled={statusUpdating === facility.id}
                          >
                            {statusUpdating === facility.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Activity className="w-4 h-4 mr-2" />
                            )}
                            Đưa về trạng thái chờ
                          </Button>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                          <Label htmlFor={`note-${facility.id}`}>Ghi chú cập nhật trạng thái</Label>
                          <Textarea
                            id={`note-${facility.id}`}
                            placeholder="Ghi nhận lý do thay đổi trạng thái để lưu vào facility_audit_log"
                            value={statusNotes[facility.id] ?? ''}
                            onChange={(event) =>
                              setStatusNotes((prev) => ({ ...prev, [facility.id]: event.target.value }))
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Luồng nghiệp vụ tổng thể</CardTitle>
              <CardDescription>
                Quy trình 4 giai đoạn từ khởi tạo hồ sơ cơ sở, xét duyệt, báo cáo định kỳ tới thanh tra hậu kiểm.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-blue-50/60">
                  <ClipboardList className="w-10 h-10 text-[#004C99]" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Giai đoạn 1 – Khởi tạo hồ sơ</h3>
                    <p className="text-sm text-gray-700">
                      Cơ sở bức xạ đăng nhập, nhập thông tin pháp lý & kỹ thuật, upload hồ sơ. Hệ thống sinh mã FACILITY_CODE và đặt trạng thái <strong>pending</strong>.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-emerald-50/60">
                  <Shield className="w-10 h-10 text-emerald-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Giai đoạn 2 – Xét duyệt hồ sơ</h3>
                    <p className="text-sm text-gray-700">
                      Sở KH&CN thẩm định thông tin thiết bị và chứng chỉ. Nếu hợp lệ chuyển sang trạng thái <strong>approved</strong>, sinh mã License_ID.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-yellow-50/60">
                  <Calendar className="w-10 h-10 text-yellow-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Giai đoạn 3 – Cập nhật định kỳ</h3>
                    <p className="text-sm text-gray-700">
                      Cơ sở gửi báo cáo 6-12 tháng, cập nhật nhân sự & thiết bị. Hệ thống ghi nhận audit trail và cảnh báo cho Thanh tra.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 border rounded-xl bg-rose-50/60">
                  <Users className="w-10 h-10 text-rose-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Giai đoạn 4 – Thanh tra & hậu kiểm</h3>
                    <p className="text-sm text-gray-700">
                      Thanh tra lọc danh sách theo nguy cơ, tình trạng giấy phép và lịch sử vi phạm để thực hiện kiểm tra.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Giám sát hoạt động & Audit log</CardTitle>
              <CardDescription>
                Lưu dấu vết hành động vào bảng <code>facility_audit_log</code> để đảm bảo tuân thủ ATBX.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 border rounded-lg bg-white">
                  <p className="text-sm text-gray-600">Lượt thao tác gần nhất</p>
                  <p className="text-2xl font-bold text-gray-900">{facilities.length}</p>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                  <p className="text-sm text-gray-600">Hồ sơ cần theo dõi</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                  <p className="text-sm text-gray-600">Giấy phép hiệu lực</p>
                  <p className="text-2xl font-bold text-emerald-600">{stats.approved}</p>
                </div>
              </div>

              <div className="border rounded-lg divide-y">
                {(facilities ?? []).slice(0, 5).map((facility) => (
                  <div key={facility.id} className="flex items-start gap-3 p-4">
                    <div className="mt-1">
                      <Badge className={statusColors[facility.status]}> {facility.status}</Badge>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{facility.name}</p>
                      <p className="text-sm text-gray-600">
                        Cập nhật lần cuối {formatDate(facility.updated_at)} • Mã hồ sơ {facility.facility_code}
                      </p>
                    </div>
                  </div>
                ))}
                {facilities.length === 0 && (
                  <div className="p-6 text-center text-sm text-gray-500">Chưa có dữ liệu audit để hiển thị.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </FeatureLayout>
  )
}
