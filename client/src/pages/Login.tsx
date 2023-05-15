import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Button,
  TextField,
  Tab,Tabs,
  MenuItem,
  Paper,
}  from '@mui/material';
import {
  createAccount,
  loginAccount,
} from "../api/user";

import TabPanel from "../components/TabPanel";
import { Faction } from "../types/generated/faction";
import { AccountDetails } from "../types/game";
import factions from '../data/factions.json';
import FactionCard from '../components/FactionCard';
import AccountDetailCard from "../components/AccountDetailCard";
import { toValidAccountSymbol } from "../util/validate";

import {

  DangerousTwoTone,
  ReportProblemTwoTone,

  DeleteForeverTwoTone,
  
  KeyTwoTone,
  SaveTwoTone,
  CloudUploadTwoTone,

} from '@mui/icons-material';

function toFaction(f:any): Faction{return f};

function a11yProps(index: number) {
  return {
    id: `login-tab-${index}`,
    'aria-controls': `login-tabpanel-${index}`,
  };
}

function accountSort(a:AccountDetails,b:AccountDetails){
  if(a.agent.symbol < b.agent.symbol){
    return -1
  }
  if(a.agent.symbol > b.agent.symbol){
    return 1
  }
  return 0
}

function GetAccountList():AccountDetails[]{
  let accountListStr = localStorage.getItem('accountList') || '[]';
  let accountList:AccountDetails[] = []
  try {
    accountList = JSON.parse(accountListStr);
  } catch (error) {}
  return accountList;
}

const sx = {
  button: { 
    mt: 2, 
    mb: 2 
  },
  bodyText:{
  //  alignItems: "left", 
    padding: 2, 
  //  width:"100%"
  },
  boxContent:{  
    boxShadow: 3,
    borderRadius: 2,
    px: 4,
    py: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    elevation: 6,
  },
}

export default function LoginPage() {

  const [curTab, setCurTab] = React.useState<number>(0);
  const [accountList, setAccountList] = React.useState<AccountDetails[]>(GetAccountList())
  const [faction, setFaction] = React.useState<string>("COSMIC")
  const [callsymbol, setCallsymbol] = React.useState<string>("")
  const [account, setAccount] = React.useState<AccountDetails>(accountList[0])
  
  
  const AddAccountData = (data:any)=>{
    if(data.agent){
      localStorage.setItem('agent',JSON.stringify(data.agent) || '{}');
      localStorage.setItem('faction',JSON.stringify(data.faction) || '{}');
      let accountList = GetAccountList();
      accountList.push({
        agent:data.agent,
        token:data.token,
        faction:data.faction,
      })
      localStorage.setItem('accountList',JSON.stringify(accountList) || '{}');
      setAccountList(accountList)
    }
  }

  const handleCreateAccount = (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const symbol = data.get("symbol")?.toString();
    const faction = data.get("faction")?.toString();

    if(symbol && faction){
      createAccount(symbol,faction).then((rsp)=>{
        if(rsp){
          console.log('createAccount:',rsp.status,rsp.statusText)
          if(rsp.data?.data?.token){
            const data = rsp.data.data
            localStorage.setItem('apitoken',data.token.toString() || '');
            AddAccountData(data);
          }
        }
      });
    }
  };

  const handleSelectAccount = (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const symbol = data.get("symbol")?.toString();
    const faction = data.get("faction")?.toString();

    //loginAccount

    //localStorage.setItem('apitoken',apitoken?.toString() || '');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <div>
      <Tabs value={curTab} onChange={handleTabChange} centered aria-label="basic tabs example">
        <Tab label="Create Account" {...a11yProps(0)} />
        <Tab label="Add API Token" {...a11yProps(1)} />
        <Tab label="Select Account" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={curTab} index={0}>
        {/* Create Account Start */}
        <Container component="main" maxWidth="sm">
          <Paper  elevation={3}>
            <Box
              sx={sx.boxContent}
            >
              <Typography component="h1" variant="h5">
                Create Account
              </Typography>
              <Typography component="h1" variant="body2" sx={sx.bodyText}>
                Create a new account for the SpaceTraders game.
              </Typography>
              <Box component="form" onSubmit={handleCreateAccount} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  select
                  defaultValue={faction}
                  name="faction"
                  label="Faction"
                  id="faction"
                  onChange={(event)=>{setFaction(event.target.value.toString())}}
                  >
                    {factions.map((faction) => (
                      <MenuItem key={faction.symbol} value={faction.symbol} dense>
                        {faction.name}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="symbol"
                  label="Call Symbol"
                  type="text"
                  id="symbol"
                  autoComplete="callsymbol"
                  value={callsymbol}
                  onChange={(event)=>{setCallsymbol(toValidAccountSymbol(event.target.value.toString()))}}
                  />
                <Button
                  type="submit"
                  startIcon={<SaveTwoTone />}
                  fullWidth
                  variant="contained"
                  sx={sx.button}
                >
                  Create
                </Button>
                {
                  factions.filter(f=>f.symbol === faction).map(faction=>{
                    return (<FactionCard faction={toFaction(faction)} />)
                  })
                }
              </Box>
            </Box>
          </Paper>
        </Container>
        {/* Create Account End */}
      </TabPanel>
      <TabPanel value={curTab} index={1}>
        {/* Login Start */}
        <Container component="main" maxWidth="sm">
          <Paper  elevation={3}>
            <Box
              sx={sx.boxContent}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Typography component="h1" variant="body2" sx={sx.bodyText}>
                Add an existing account by adding the API Token to this site's localstorage. 
                This site runs from your browser, and only sends data the official <Link href="https://spacetraders.io">spacetraders.io</Link> API.
              </Typography>
              <Box component="form" onSubmit={handleSelectAccount} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="apitoken"
                  label="API Token"
                  type="password"
                  id="apitoken"
                  autoComplete="apitoken"
                />
                <Button
                  type="submit"
                  startIcon={<KeyTwoTone />}
                  fullWidth
                  variant="contained"
                  sx={sx.button}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
        {/* Login End */}
      </TabPanel>
      <TabPanel value={curTab} index={2}>
        {/* Select Account Start */}
        <Container component="main" maxWidth="sm">
          <Paper  elevation={3}>
            <Box
              sx={sx.boxContent}
            >
              <Typography component="h1" variant="h5">
                Select Account
              </Typography>
              <Typography component="h1" variant="body2" sx={sx.bodyText}>
                Load an account you have already used from this site. 
              </Typography>
              <Box component="form" onSubmit={handleSelectAccount} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  fullWidth
                  select
                  defaultValue={account?.agent.accountId || ""}
                  name="accountId"
                  label="Account"
                  id="accountId"
                  onChange={(event)=>{
                    const accountId = event.target.value.toString()
                    const a = accountList.find(a=>a.agent.accountId === accountId)
                    if(a){
                      setAccount(a);
                      setFaction(a.faction.symbol)
                    }
                  }}
                  >
                    {accountList.sort(accountSort).map((account) => (
                      <MenuItem key={account.agent.accountId} value={account.agent.accountId} dense>
                        {account.agent.symbol} ({account.faction.name})
                      </MenuItem>
                    ))}
                </TextField>
                <Button
                  type="submit"
                  startIcon={<CloudUploadTwoTone />}
                  fullWidth
                  variant="contained"
                  sx={sx.button}
                >
                  Select
                </Button>
                {
                  account?(<AccountDetailCard Account={account} />):(<div/>)
                }
                <Button
                  type="submit"
                  startIcon={<DeleteForeverTwoTone />}
                  fullWidth
                  color="error"
                  variant="contained"
                  sx={sx.button}
                >
                  Forget
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
        {/* Select Account End */}
      </TabPanel>
    </div>
  );
}