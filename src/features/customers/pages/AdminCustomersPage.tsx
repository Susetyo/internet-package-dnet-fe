import {
    AddRounded,
    CheckCircleRounded,
    DeleteRounded,
    EditRounded,
    EmailRounded,
    KeyRounded,
    PeopleRounded,
    PhoneRounded,
    SearchRounded,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    MenuItem,
    Pagination,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { DashboardCard, EmptyPanel } from "../../../shared/components";
import {
    customersQueryKey,
    useCustomersQuery,
} from "../../../shared/hooks";
import { useAuthStore } from "../../auth/store/auth.store";
import type { User } from "../../auth/types/auth.types";
import { customersApi } from "../api/customers.api";
import { usersApi } from "../api/users.api";
import type { Customer } from "../types/customer.types";

type CustomerFormState = {
    name: string;
    phone: string;
    email: string;
    segment: Customer["segment"];
    status: Customer["status"];
    password: string;
};

type CustomerWithUser = Customer & {
    user?: User;
};

const emptyForm: CustomerFormState = {
    name: "",
    phone: "",
    email: "",
    segment: "Silver",
    status: "active",
    password: "",
};

const usersQueryKey = ["users"] as const;
const rowsPerPage = 6;

export function AdminCustomersPage() {
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();
    const [form, setForm] = useState<CustomerFormState>(emptyForm);
    const [formOpen, setFormOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] =
        useState<CustomerWithUser | null>(null);
    const [deletingCustomer, setDeletingCustomer] =
        useState<CustomerWithUser | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        data: customers = [],
        isLoading: isCustomersLoading,
        isError: isCustomersError,
    } = useCustomersQuery();
    const {
        data: users = [],
        isLoading: isUsersLoading,
        isError: isUsersError,
    } = useQuery({
        queryKey: usersQueryKey,
        queryFn: usersApi.getAll,
    });

    const customersWithUser = useMemo<CustomerWithUser[]>(() => {
        const userByCustomerId = new Map(
            users
                .filter((item) => item.role === "customer" && item.customerId)
                .map((item) => [item.customerId, item]),
        );

        return customers.map((customer) => ({
            ...customer,
            user: userByCustomerId.get(customer.id),
        }));
    }, [customers, users]);

    const customerUsersCount = users.filter(
        (item) => item.role === "customer",
    ).length;
    const filteredCustomers = useMemo(() => {
        const keyword = searchQuery.trim().toLowerCase();

        if (!keyword) return customersWithUser;

        return customersWithUser.filter((customer) =>
            customer.name.toLowerCase().includes(keyword),
        );
    }, [customersWithUser, searchQuery]);
    const totalPages = Math.max(
        1,
        Math.ceil(filteredCustomers.length / rowsPerPage),
    );
    const currentPage = Math.min(page, totalPages);
    const paginatedCustomers = filteredCustomers.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage,
    );

    const invalidateCustomerData = async () => {
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: customersQueryKey }),
            queryClient.invalidateQueries({ queryKey: usersQueryKey }),
        ]);
    };

    const createMutation = useMutation({
        mutationFn: async (payload: CustomerFormState) => {
            const normalizedEmail = payload.email.trim().toLowerCase();
            const existingUsers = await usersApi.getByEmail(normalizedEmail);

            if (existingUsers[0]) throw new Error("Email sudah terdaftar.");

            const customer = await customersApi.create({
                name: payload.name.trim(),
                phone: payload.phone.trim(),
                email: normalizedEmail,
                segment: payload.segment,
                status: payload.status,
            });

            await usersApi.createCustomer({
                name: payload.name.trim(),
                email: normalizedEmail,
                password: payload.password,
                customerId: customer.id,
            });

            return customer;
        },
        onSuccess: async () => {
            setForm(emptyForm);
            setFormOpen(false);
            setFormError("");
            setSuccessMessage("Customer dan akun login berhasil ditambahkan.");
            await invalidateCustomerData();
        },
        onError: (error) => setFormError(error.message),
    });

    const updateMutation = useMutation({
        mutationFn: async (payload: CustomerFormState) => {
            if (!editingCustomer) throw new Error("Customer belum dipilih.");

            const normalizedEmail = payload.email.trim().toLowerCase();
            const existingUsers = await usersApi.getByEmail(normalizedEmail);
            const duplicateUser = existingUsers.find(
                (item) => item.id !== editingCustomer.user?.id,
            );

            if (duplicateUser) throw new Error("Email sudah terdaftar.");

            const updatedCustomer = await customersApi.update(
                editingCustomer.id,
                {
                    id: editingCustomer.id,
                    name: payload.name.trim(),
                    phone: payload.phone.trim(),
                    email: normalizedEmail,
                    segment: payload.segment,
                    status: payload.status,
                },
            );

            if (editingCustomer.user) {
                await usersApi.updateCustomer(editingCustomer.user.id, {
                    name: payload.name.trim(),
                    email: normalizedEmail,
                    password: payload.password.trim() || undefined,
                });
            } else if (payload.password.trim()) {
                await usersApi.createCustomer({
                    name: payload.name.trim(),
                    email: normalizedEmail,
                    password: payload.password.trim(),
                    customerId: editingCustomer.id,
                });
            }

            return updatedCustomer;
        },
        onSuccess: async () => {
            setEditingCustomer(null);
            setForm(emptyForm);
            setFormOpen(false);
            setFormError("");
            setSuccessMessage("Data customer berhasil diperbarui.");
            await invalidateCustomerData();
        },
        onError: (error) => setFormError(error.message),
    });

    const deleteMutation = useMutation({
        mutationFn: async (customer: CustomerWithUser) => {
            await customersApi.remove(customer.id);

            if (customer.user) {
                await usersApi.remove(customer.user.id);
            }
        },
        onSuccess: async () => {
            setDeletingCustomer(null);
            setSuccessMessage("Customer dan akun login berhasil dihapus.");
            await invalidateCustomerData();
        },
    });

    const isEditing = Boolean(editingCustomer);
    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const isLoading = isCustomersLoading || isUsersLoading;
    const hasError = isCustomersError || isUsersError;

    if (user?.role !== "admin") {
        return (
            <Alert severity="error">
                Halaman customer hanya bisa diakses oleh role admin.
            </Alert>
        );
    }

    const closeForm = () => {
        if (isSubmitting) return;
        setFormOpen(false);
        setEditingCustomer(null);
        setForm(emptyForm);
        setFormError("");
    };

    const startCreate = () => {
        setEditingCustomer(null);
        setForm(emptyForm);
        setFormError("");
        setFormOpen(true);
    };

    const startEdit = (customer: CustomerWithUser) => {
        setEditingCustomer(customer);
        setForm({
            name: customer.name,
            phone: customer.phone,
            email: customer.email,
            segment: customer.segment,
            status: customer.status,
            password: "",
        });
        setFormError("");
        setFormOpen(true);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSuccessMessage("");
        setFormError("");

        if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
            setFormError("Nama, telepon, dan email wajib diisi.");
            return;
        }

        if (!isEditing && !form.password.trim()) {
            setFormError("Password wajib diisi saat menambahkan customer.");
            return;
        }

        if (isEditing && !editingCustomer?.user && !form.password.trim()) {
            setFormError(
                "Customer ini belum punya akun login. Isi password untuk membuat akun.",
            );
            return;
        }

        const payload = {
            ...form,
            password: form.password.trim(),
        };

        if (isEditing) {
            updateMutation.mutate(payload);
            return;
        }

        createMutation.mutate(payload);
    };

    return (
        <Stack spacing={3}>
            {hasError && (
                <Alert severity="error">
                    Gagal mengambil data customer. Pastikan `pnpm server`
                    berjalan di port 3001.
                </Alert>
            )}
            {successMessage && (
                <Alert
                    icon={<CheckCircleRounded fontSize="inherit" />}
                    severity="success"
                    onClose={() => setSuccessMessage("")}
                >
                    {successMessage}
                </Alert>
            )}

            <Stack
                direction={{ xs: "column", md: "row" }}
                sx={{
                    alignItems: { xs: "flex-start", md: "center" },
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                <Box>
                    <Typography component="h1" sx={pageTitleSx}>
                        Customer
                    </Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                        Kelola customer, akun login, password, dan status user.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddRounded />}
                    onClick={startCreate}
                    sx={primaryButtonSx}
                >
                    Tambah User
                </Button>
            </Stack>

            <DashboardCard>
                <Stack spacing={2.5}>
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        sx={{
                            alignItems: { xs: "flex-start", md: "center" },
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{ alignItems: "center" }}
                        >
                            <Box sx={iconBoxSx}>
                                <PeopleRounded />
                            </Box>
                            <Box>
                                <Typography sx={sectionTitleSx}>
                                    Daftar Users
                                </Typography>
                                <Typography
                                    sx={{ color: "rgba(255,255,255,0.62)" }}
                                >
                                    Card list customer dan akun login terkait.
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                            <Chip
                                label={`${customers.length} customer`}
                                sx={infoChipSx}
                            />
                            <Chip
                                label={`${customerUsersCount} akun`}
                                sx={yellowChipSx}
                            />
                        </Stack>
                    </Stack>

                    <TextField
                        placeholder="Cari nama user"
                        value={searchQuery}
                        onChange={(event) => {
                            setSearchQuery(event.target.value);
                            setPage(1);
                        }}
                        size="small"
                        sx={{ ...fieldSx, maxWidth: 520 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchRounded
                                            sx={{ color: "rgba(255,255,255,0.58)" }}
                                        />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {isLoading ? (
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{
                                alignItems: "center",
                                justifyContent: "center",
                                py: 4,
                            }}
                        >
                            <CircularProgress
                                size={22}
                                sx={{ color: "#72d8ff" }}
                            />
                            <Typography sx={{ color: "rgba(255,255,255,0.72)" }}>
                                Memuat customer...
                            </Typography>
                        </Stack>
                    ) : filteredCustomers.length ? (
                        <>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        md: "repeat(2, minmax(0, 1fr))",
                                        xl: "repeat(3, minmax(0, 1fr))",
                                    },
                                    gap: 1.5,
                                }}
                            >
                                {paginatedCustomers.map((customer) => (
                                    <CustomerCard
                                        key={customer.id}
                                        customer={customer}
                                        onEdit={startEdit}
                                        onDelete={setDeletingCustomer}
                                    />
                                ))}
                            </Box>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1.5}
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.62)",
                                        fontSize: 13,
                                    }}
                                >
                                    Menampilkan {(currentPage - 1) * rowsPerPage + 1}-
                                    {Math.min(
                                        currentPage * rowsPerPage,
                                        filteredCustomers.length,
                                    )}{" "}
                                    dari {filteredCustomers.length} users
                                </Typography>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={(_, value) => setPage(value)}
                                    shape="rounded"
                                    sx={paginationSx}
                                />
                            </Stack>
                        </>
                    ) : (
                        <EmptyPanel
                            message={
                                searchQuery.trim()
                                    ? "Nama user tidak ditemukan."
                                    : "Belum ada data customer."
                            }
                        />
                    )}
                </Stack>
            </DashboardCard>

            <Dialog
                open={formOpen}
                onClose={closeForm}
                fullWidth
                maxWidth="sm"
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        bgcolor: "#121c2a",
                        color: "#fff",
                    }}
                >
                    <DialogTitle sx={{ fontWeight: 900 }}>
                        {isEditing ? "Edit User" : "Tambah User"}
                    </DialogTitle>
                    <DialogContent>
                        <Stack spacing={2} sx={{ pt: 1 }}>
                            <Typography sx={{ color: "rgba(255,255,255,0.62)" }}>
                                {isEditing
                                    ? "Kosongkan password jika tidak ingin mengganti."
                                    : "Akun login customer dibuat bersama data customer."}
                            </Typography>
                            {formError && (
                                <Alert
                                    severity="error"
                                    onClose={() => setFormError("")}
                                >
                                    {formError}
                                </Alert>
                            )}
                            <TextField
                                label="Nama"
                                value={form.name}
                                onChange={(event) =>
                                    setForm((current) => ({
                                        ...current,
                                        name: event.target.value,
                                    }))
                                }
                                size="small"
                                sx={fieldSx}
                            />
                            <TextField
                                label="Email"
                                type="email"
                                value={form.email}
                                onChange={(event) =>
                                    setForm((current) => ({
                                        ...current,
                                        email: event.target.value,
                                    }))
                                }
                                size="small"
                                sx={fieldSx}
                            />
                            <TextField
                                label="Telepon"
                                value={form.phone}
                                onChange={(event) =>
                                    setForm((current) => ({
                                        ...current,
                                        phone: event.target.value,
                                    }))
                                }
                                size="small"
                                sx={fieldSx}
                            />
                            <TextField
                                label={isEditing ? "Password baru" : "Password"}
                                type="password"
                                value={form.password}
                                onChange={(event) =>
                                    setForm((current) => ({
                                        ...current,
                                        password: event.target.value,
                                    }))
                                }
                                size="small"
                                sx={fieldSx}
                            />
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                            >
                                <TextField
                                    label="Segment"
                                    select
                                    fullWidth
                                    value={form.segment}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            segment: event.target
                                                .value as Customer["segment"],
                                        }))
                                    }
                                    size="small"
                                    sx={fieldSx}
                                >
                                    <MenuItem value="Silver">Silver</MenuItem>
                                    <MenuItem value="Gold">Gold</MenuItem>
                                    <MenuItem value="Platinum">Platinum</MenuItem>
                                </TextField>
                                <TextField
                                    label="Status"
                                    select
                                    fullWidth
                                    value={form.status}
                                    onChange={(event) =>
                                        setForm((current) => ({
                                            ...current,
                                            status: event.target
                                                .value as Customer["status"],
                                        }))
                                    }
                                    size="small"
                                    sx={fieldSx}
                                >
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                </TextField>
                            </Stack>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3 }}>
                        <Button
                            type="button"
                            onClick={closeForm}
                            disabled={isSubmitting}
                            sx={secondaryButtonSx}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            startIcon={
                                isSubmitting ? (
                                    <CircularProgress size={16} />
                                ) : isEditing ? (
                                    <KeyRounded />
                                ) : (
                                    <AddRounded />
                                )
                            }
                            sx={primaryButtonSx}
                        >
                            {isEditing ? "Simpan" : "Tambah"}
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog
                open={Boolean(deletingCustomer)}
                onClose={() => {
                    if (!deleteMutation.isPending) setDeletingCustomer(null);
                }}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle sx={{ color: "#102331", fontWeight: 900 }}>
                    Hapus customer?
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Data {deletingCustomer?.name} dan akun login terkait
                        akan dihapus.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDeletingCustomer(null)}
                        disabled={deleteMutation.isPending}
                    >
                        Batal
                    </Button>
                    <Button
                        color="error"
                        variant="contained"
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                            if (deletingCustomer) {
                                deleteMutation.mutate(deletingCustomer);
                            }
                        }}
                    >
                        Hapus
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}

function CustomerCard({
    customer,
    onEdit,
    onDelete,
}: {
    customer: CustomerWithUser;
    onEdit: (customer: CustomerWithUser) => void;
    onDelete: (customer: CustomerWithUser) => void;
}) {
    return (
        <Box sx={userCardSx}>
            <Stack spacing={2}>
                <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "flex-start", minWidth: 0 }}
                >
                    <Box sx={avatarSx}>{customer.name.charAt(0)}</Box>
                    <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography sx={cardTitleSx}>{customer.name}</Typography>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ flexWrap: "wrap", mt: 0.75 }}
                        >
                            <Chip
                                label={customer.segment}
                                size="small"
                                sx={infoChipSx}
                            />
                            <Chip
                                label={customer.status}
                                size="small"
                                sx={
                                    customer.status === "active"
                                        ? activeChipSx
                                        : inactiveChipSx
                                }
                            />
                            <Chip
                                label={customer.user ? "login aktif" : "belum ada akun"}
                                size="small"
                                sx={
                                    customer.user ? activeChipSx : inactiveChipSx
                                }
                            />
                        </Stack>
                    </Box>
                </Stack>

                <Stack spacing={1}>
                    <InfoLine icon={<EmailRounded />} text={customer.email} />
                    <InfoLine icon={<PhoneRounded />} text={customer.phone} />
                </Stack>

                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        pt: 1,
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                    }}
                >
                    <Typography sx={{ color: "rgba(255,255,255,0.48)", fontSize: 12 }}>
                        ID: {customer.id}
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                        <Tooltip title="Edit user atau ganti password">
                            <IconButton
                                onClick={() => onEdit(customer)}
                                sx={iconButtonSx}
                            >
                                <EditRounded fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Hapus user">
                            <IconButton
                                onClick={() => onDelete(customer)}
                                sx={{ ...iconButtonSx, color: "#ff7f9c" }}
                            >
                                <DeleteRounded fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

function InfoLine({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", minWidth: 0 }}
        >
            <Box sx={{ color: "rgba(255,255,255,0.48)", display: "flex" }}>
                {icon}
            </Box>
            <Typography sx={infoTextSx}>{text}</Typography>
        </Stack>
    );
}

const pageTitleSx = {
    color: "#fff",
    fontSize: { xs: 24, md: 28 },
    fontWeight: 900,
    letterSpacing: 0,
    m: 0,
};

const sectionTitleSx = {
    color: "#fff",
    fontSize: 16,
    fontWeight: 900,
    letterSpacing: 0,
};

const fieldSx = {
    "& .MuiInputBase-root": {
        color: "#fff",
        bgcolor: "rgba(255,255,255,0.08)",
        borderRadius: 1,
    },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.62)" },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(255,255,255,0.12)",
    },
    "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.72)" },
};

const iconBoxSx = {
    width: 48,
    height: 48,
    borderRadius: 1.5,
    display: "grid",
    placeItems: "center",
    bgcolor: "rgba(246,196,0,0.16)",
    color: "#f6c400",
};

const avatarSx = {
    width: 44,
    height: 44,
    borderRadius: 1.25,
    display: "grid",
    placeItems: "center",
    flex: "0 0 auto",
    bgcolor: "#f6c400",
    color: "#102331",
    fontWeight: 900,
    textTransform: "uppercase",
};

const userCardSx = {
    p: 2,
    borderRadius: 1.25,
    bgcolor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    minWidth: 0,
};

const cardTitleSx = {
    color: "#fff",
    fontWeight: 900,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
};

const infoTextSx = {
    color: "rgba(255,255,255,0.68)",
    fontSize: 13,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
};

const primaryButtonSx = {
    bgcolor: "#f6c400",
    color: "#102331",
    textTransform: "none",
    fontWeight: 900,
    "&:hover": { bgcolor: "#e5b600" },
};

const secondaryButtonSx = {
    color: "#72d8ff",
    textTransform: "none",
    fontWeight: 900,
};

const iconButtonSx = {
    color: "#72d8ff",
};

const infoChipSx = {
    bgcolor: "rgba(114,216,255,0.16)",
    color: "#72d8ff",
    fontWeight: 900,
};

const yellowChipSx = {
    bgcolor: "rgba(246,196,0,0.16)",
    color: "#f6c400",
    fontWeight: 900,
};

const activeChipSx = {
    bgcolor: "rgba(94,234,169,0.16)",
    color: "#5eeaa9",
    fontWeight: 900,
};

const inactiveChipSx = {
    bgcolor: "rgba(255,127,156,0.16)",
    color: "#ff7f9c",
    fontWeight: 900,
};

const paginationSx = {
    "& .MuiPaginationItem-root": {
        color: "rgba(255,255,255,0.78)",
        borderRadius: 1,
    },
    "& .Mui-selected": {
        bgcolor: "#f6c400 !important",
        color: "#102331",
        fontWeight: 900,
    },
};
