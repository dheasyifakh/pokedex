import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

interface SidebarProps {
    types: { name: string }[];
    setSelectedType: (type: string | null) => void;
    setCurrentPage: (type: number | null) => void;
  }

const Sidebar: React.FC<SidebarProps> = ({ setSelectedType, types, setCurrentPage}) => {

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
