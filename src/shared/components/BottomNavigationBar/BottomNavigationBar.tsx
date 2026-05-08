import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import WifiRoundedIcon from "@mui/icons-material/WifiRounded";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
    ["Dashboard", "/dashboard", <HomeRoundedIcon />],
    ["Customers", "/customers", <PeopleRoundedIcon />],
    ["Paket", "/packages", <WifiRoundedIcon />],
    ["Transaksi", "/transactions", <ReceiptLongRoundedIcon />],
] as const;

export function BottomNavigationBar() {
    const nav = useNavigate();
    const loc = useLocation();
    const value =
        items.find((i) => loc.pathname.startsWith(i[1]))?.[1] ?? "/dashboard";
    return (
        <Paper
            sx={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 10 }}
            elevation={8}
        >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(_, v) => nav(v)}
            >
                {items.map(([label, path, icon]) => (
                    <BottomNavigationAction
                        key={path}
                        label={label}
                        value={path}
                        icon={icon}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    );
}
