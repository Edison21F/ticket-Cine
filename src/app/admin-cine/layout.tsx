import { SideNav } from "./side-nav"
import { TopBar } from "./top-bar"
const navigationItems = [
  {
    label: "Inicio",
    items: [
      { label: "Regresar a EvenTix", icon: "pi pi-home", routerLink: ["https://ticket-production-749d.up.railway.app/admin"] },
      { label: "EventTix-Cine", icon: "pi pi-plus", routerLink: ["/admin-cine"] },
    ],
  },
  {
    label: "Gestión de Cine",
    items: [
      { label: "Películas", icon: "pi pi-video", routerLink: ["/admin/peliculas"] },
      { label: "Roles y Permisos", icon: "pi pi-key", routerLink: ["/admin/roles"] },
      { label: "Personal", icon: "pi pi-users", routerLink: ["/admin/personal"] },
    ],
  },
  {
    label: "Tienda",
    items: [
      { label: "Productos", icon: "pi pi-shopping-bag", routerLink: ["/admin-cine/tienda"] },
      
    ],
  },
  {
    label: "Boletos",
    items: [
      { label: "Venta de Boletos", icon: "pi pi-ticket", routerLink: ["/admin/boletos"] },
      { label: "Historial de Compras", icon: "pi pi-history", routerLink: ["/admin/historial-boletos"] },
    ],
  },
  {
    label: "Sesión",
    items: [
      { label: "Cerrar sesión", icon: "pi pi-sign-out", routerLink: ["/auth"] },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="bg-gradient-to-br from-purple-900 via-[#1c1c25] to-blue-900  max-w mx-auto ">
        <div  className="flex min-h-screen">
        

          <SideNav items={navigationItems}/>
          
          <div className="flex-1">
            <TopBar />
            
            <main className="flex-1 p-3">{children}</main>
          </div>
        </div>
      </div>
  
  )
}

