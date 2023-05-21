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
  Alert,AlertTitle,
  colors,
  Paper,
}  from '@mui/material';
import {
  createAccount,
  loginAccount,
  getFactions,
} from "../api/gameAPI";

import TabPanel from "../components/TabPanel";
import { Faction } from "../types/generated/faction";
import { 
  AccountDetails,
  ErrorMessageHTTP,
  GameData,
} from "../types/gameType";

import FactionCard from '../components/FactionCard';
import AccountDetailCard from "../components/AccountDetailCard";
import AlertErrorsHTTP from "../components/AlertErrorsHTTP";
import { toValidAccountSymbol } from "../util/validateUtil";
import DraggableDialog from "../components/DraggableDialog"
import {
  DeleteForeverTwoTone,
  KeyTwoTone,
  SaveTwoTone,
  CloudUploadTwoTone,
} from '@mui/icons-material';

function toFaction(f:any): Faction{return f};

function tabProps(index: number) {
  return {
    key: `login-tab-${index}`,
    id: `login-tab-${index}`,
    'aria-controls': `login-tabpanel-${index}`,
    sx:{
      borderBottomWidth: 2,
      borderBottomStyle: "groove",
      borderBottomColor:  colors.grey[600],
    }
  };
}

function accountSort(a:AccountDetails,b:AccountDetails){
  if(a?.agent?.symbol < b?.agent?.symbol){
    return -1
  }
  if(a?.agent?.symbol > b?.agent?.symbol){
    return 1
  }
  return 0
}

function defaultAccount(accountList:AccountDetails[],gameData:GameData){
  let id = gameData.agent?.accountId ||''
  let a = accountList.find(a=>a.agent.accountId === id)
  return a || accountList.sort(accountSort)[0]
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

export default function LoginPage(props:{gameData:GameData, setGameData:(gd:GameData)=>void}) {
  const [doneLoading, setDoneLoading] = React.useState<boolean>(false)
  const [factions, setFactions] = React.useState<Faction[]>([])

  const [accountList, setAccountList] = React.useState<AccountDetails[]>(GetAccountList().sort(accountSort))
  const [faction, setFaction] = React.useState<string>("COSMIC")
  const [callsymbol, setCallsymbol] = React.useState<string>("")
  const [account, setAccount] = React.useState<AccountDetails|undefined>(defaultAccount(accountList,props.gameData))
  const [toDeleteAccount, setToDeleteAccount] = React.useState<AccountDetails|undefined>()

  const [curTab, setCurTab] = React.useState<number>(accountList.length>0?2:0);

  const [displayHTTPError, setDisplayHTTPError] = React.useState<ErrorMessageHTTP>()
  const [displayNewUser, setDisplayNewUser] = React.useState<AccountDetails>()

  
  React.useEffect(()=>{
    if(doneLoading) return;
    getFactions().then((f)=>setFactions(f))
    setDoneLoading(true);

  },[doneLoading,factions])
  
  const AddAccountData = (data:any)=>{
    if(data.agent){
      localStorage.setItem('agent',JSON.stringify(data.agent) || '{}');
      localStorage.setItem('factions',JSON.stringify([data.faction]) || '{}');
      localStorage.setItem('token',JSON.stringify(data.token) || '{}');
      let accountList = GetAccountList();
      const newUser:AccountDetails={
        agent:data.agent,
        token:data.token,
        faction:data.faction,
      }
      accountList.push(newUser);
      localStorage.setItem('accountList',JSON.stringify(accountList) || '{}');
      setAccountList(accountList)
      setDisplayNewUser(newUser)
    }
  }

  const RemoveAccountData = (data:AccountDetails)=>{
    let accountList = GetAccountList().filter(al=>al.token !== data.token)
    localStorage.setItem('accountList',JSON.stringify(accountList) || '{}');
    setAccount(accountList[0])
    setAccountList(accountList)
    setToDeleteAccount(undefined)
    if(accountList.length===0){
      setCurTab(0);
    }
  }

  const handleCreateAccount = (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const symbol = data.get("symbol")?.toString();
    const faction = data.get("faction")?.toString();

    if(symbol && faction){
      createAccount(symbol,faction)
        .then((rsp)=>{
          if(rsp){
            if(rsp.api?.data?.data?.token){
              const data = rsp.api.data.data
              localStorage.setItem('token',data.token.toString() || '');
              AddAccountData(data);
            }
            if(rsp.api?.data?.error){
              const data = rsp.api.data
              setDisplayHTTPError(data);
            }
            if(rsp.gd){
              props.setGameData(rsp.gd)
            }
          }
        })
    }
  };

  const handleSelectAccount = (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const accountId = data.get("accountId")?.toString();
    const account = accountList.find((a)=>a.agent.accountId === accountId)

    if(account){
      loginAccount(account.token)
        .then((gameData)=>{
          if(gameData){
            console.log('loginAccount:',gameData)
            props.setGameData(gameData)
          }
        })
    }
  };

  const handleAddToken = (event:any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = data.get("token")?.toString();

    if(token){
      loginAccount(token)
        .then((gameData)=>{
          if(gameData && gameData.agent && gameData.token && gameData.factions){
            console.log('loginAccount:',gameData)
            props.setGameData(gameData)
            const data:AccountDetails = {
              agent:gameData.agent,
              token:gameData.token,
              faction:gameData.factions[0],
            }
            AddAccountData(data);
          }
        })
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <div>
      <Container component="main" maxWidth="sm" sx={{paddingTop: 2}}>
        <Paper  elevation={3}>
          <Tabs 
            value={curTab} 
            onChange={handleTabChange} 
            centered aria-label="LoginPageTabs" 
            scrollButtons
            allowScrollButtonsMobile 
            variant="fullWidth"
          >
            <Tab label="New User" {...tabProps(0)} />
            <Tab label="Add API Token" {...tabProps(1)} />
            <Tab label="Login" {...tabProps(2)} disabled={accountList.length===0}/>
          </Tabs>
          <Box
            sx={sx.boxContent}
          >
            <TabPanel value={curTab} index={0}>
              {/* Create Account Start */}
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
                    return (<FactionCard faction={toFaction(faction)}  key={`factioncard-${faction.symbol}`}/>)
                  })
                }
              </Box>
              {/* Create Account End */}
            </TabPanel>
            <TabPanel value={curTab} index={1}>
              {/* Login Start */}
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Typography component="h1" variant="body2" sx={sx.bodyText}>
                Add an existing account by adding the API Token to this site's localstorage. 
                This site runs from your browser, and only sends data the official <Link href="https://spacetraders.io">spacetraders.io</Link> API.
              </Typography>
              <Box component="form" onSubmit={handleAddToken} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="token"
                  label="API Token"
                  type="password"
                  id="token"
                  autoComplete="token"
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
              {/* Login End */}
            </TabPanel>
            <TabPanel value={curTab} index={2}>
              {/* Select Account Start */}
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
                  account?(
                    <div>
                      <AccountDetailCard Account={account} />
                      <Button
                        type="submit"
                        startIcon={<DeleteForeverTwoTone />}
                        fullWidth
                        color="error"
                        variant="contained"
                        sx={sx.button}
                        onClick={()=>{setToDeleteAccount(account);console.log(account)}}
                      >
                        Forget
                      </Button>
                      {toDeleteAccount?(
                        <DraggableDialog 
                          title="Are You Sure?"
                          content="Are you sure you want to forget the below account? You will need to re-add the API token to be able to use the account on this site again. Please store the below token somewhere safe if you wish to continue using it."
                          open={true}
                          onClose={()=>setToDeleteAccount(undefined)}
                          onCancel={()=>setToDeleteAccount(undefined)}
                          onConfirm={()=>RemoveAccountData(toDeleteAccount)}
                          >
                            <AccountDetailCard Account={toDeleteAccount} /> 
                            <TextField label="API Token" value={toDeleteAccount.token} multiline fullWidth maxRows={4} style={{marginTop:10}} />
                          </DraggableDialog>
                      ):(<div/>)}
                    </div>
                  ):(<div/>)
                }
              </Box>
              {/* Select Account End */}
            </TabPanel>
          </Box>
        </Paper>
      </Container>      
      {displayHTTPError?(
        <DraggableDialog 
          title="Error"
          content={displayHTTPError.error?.message||"Error Creating An Account"}
          open={true}
          onClose={()=>setDisplayHTTPError(undefined)}
          onConfirm={()=>setDisplayHTTPError(undefined)}
          >
            <AlertErrorsHTTP ErrorMessageHTTP={displayHTTPError} />
          </DraggableDialog>
      ):(<div/>)}
      {displayNewUser?(
        <DraggableDialog 
          title="Welcome Space Commander"
          open={true}
          onClose={()=>setDisplayNewUser(undefined)}
          onConfirm={()=>setDisplayNewUser(undefined)}
          >
            <AccountDetailCard Account={displayNewUser} /> 
          </DraggableDialog>
      ):(<div/>)}
    </div>
  );
}