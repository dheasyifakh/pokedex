"use client"
import React,{useState} from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Box, styled} from "@mui/material";


interface StyledLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyledLinkProps>(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  marginRight: theme.spacing(2),
  textDecoration: 'none',
}));
const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar position="static" color="transparent" elevation={0} className='container' style={{paddingTop: 0, paddingBottom: 0}}>
        <Toolbar>
            <Box display="flex" alignItems="center" flexGrow={1}>
              <img src={"../../../assets/img/logo.png"} alt="Logo" style={{ height: "40px", marginRight: "16px" }} />
              <StyledLink href="/" active={pathname === '/'}>
                Home
              </StyledLink>
              <StyledLink href="/pokemon-type" active={pathname === '/pokemon-type'}>
                Pokemon Type
              </StyledLink>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header