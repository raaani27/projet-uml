import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
dotenv.config()

const app = express()
const sb = createClient(process.env.VITE_SB_URL, process.env.SB_SERVICE_KEY)

app.use(cors(), express.json())

app.get('/api/guides', async (_,res)=>{
  const { data,error } = await sb.from('guides').select('*')
  error ? res.status(400).json(error) : res.json(data)
})

app.listen(process.env.PORT||3000, ()=>console.log('API on 3000'))
