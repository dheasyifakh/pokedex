import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

interface SidebarProps {
    types: { name: string }[];
    setSelectedType: (type: string | null) => void;
    setCurrentPage: (type: number | null) => void;
  }

const Sidebar: React.FC<SidebarProps> = ({ setSelectedType, types, setCurrentPage}) => {
//   const [types, setTypes] = useState<Type[]>([]);


//   useEffect(() => {
    
//     const loadType = async () =>{
//         try{
//             const response = await fetch("https://pokeapi.co/api/v2/type");
//             const data = await response.json();
//             setTypes(data.results);
//         }catch (error){
            
//         }
//     }

//     loadType();
//   }, []);

  return (
    <List>
      {types.map((type) => (
        <ListItem key={type.name} disablePadding>
          <ListItemButton >
            <ListItemText primary={type.name} 
            onClick={()=>{
                setSelectedType(type.name)
                setCurrentPage(1)
            }}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    
  );
};

export default Sidebar;
