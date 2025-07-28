import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://chagas:dani@routeoptimizer.nttzkbn.mongodb.net/?retryWrites=true&w=majority&appName=RouteOptimizer'

    await mongoose.connect(mongoURI)
    console.log('MongoDB conectado!')
  } catch (error) {
    console.log(`Erro ao conectar: ${error}`)
    process.exit(1)
  }
}

export default connectDB