pipeline {
agent any
  options {
    skipDefaultCheckout(true)
  }
  tools {
    nodejs 'NodeJS 24.8.0'
  }
  stages {
    stage('Clean') {
      steps {
        cleanWs(disableDeferredWipeout: true)
      }
    }
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Build and Deploy') {
      steps {
        sh '''
          rm -rf /home/shirasao-ems-api/htdocs/ems-api.shirasao.com/*
          cp -a -r /root/.jenkins/workspace/ems-api.shirasao.com/. /home/shirasao-ems-api/htdocs/ems-api.shirasao.com/
          cd /home/shirasao-ems-api/htdocs/ems-api.shirasao.com/
          
          npm i
          npm i -g pm2
          npm run build
        '''
      }
    }
  }
}