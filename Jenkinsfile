pipeline {
  agent {
    docker {
      image 'continuousdeliverydocker/docker-agent'
      args '-v /var/run/docker.sock:/var/run/docker.sock --mount type=tmpfs,destination=/.docker'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'make build'
      }
    }

  }
}