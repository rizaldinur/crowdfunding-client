import {
  Person2,
  Settings,
  Bookmark,
  Folder,
  Logout,
} from "@mui/icons-material";

const navItems = [
  { name: "Mulai Proyek", path: "start-project" },
  { name: "Jelajahi", path: "discover" },
  { name: "Login", path: "login" },
];

const accountMenuItems = [
  {
    path: "profile",
    name: "Profil",
    icon: <Person2 color="inherit" fontSize="small" />,
  },
  {
    path: "settings",
    name: "Pengaturan",
    icon: <Settings color="inherit" fontSize="small" />,
  },
  {
    path: "saved",
    name: "Proyek Tersimpan",
    icon: <Bookmark color="inherit" fontSize="small" />,
  },
  {
    path: "projects",
    name: "Proyek Buatanmu",
    icon: <Folder color="inherit" fontSize="small" />,
  },
  {
    path: "#",
    name: "Keluar",
    icon: <Logout color="error" fontSize="small" />,
  },
];

const businessCategories = [
  "Teknologi",
  "Makanan",
  "Game",
  "Seni",
  "Musik",
  "Film & Video",
  "Fashion",
  "Desain Produk",
  "Kerajinan",
  "Publikasi",
  "Kesehatan",
  "Lingkungan",
  "Pendidikan",
  "Sosial",
  "Aplikasi & Web",
  "Pertanian",
  "Gaya Hidup",
  "Olahraga",
  "Kecantikan",
  "Pariwisata",
];

export { navItems, accountMenuItems, businessCategories };
