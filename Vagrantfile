Vagrant.configure("2") do |config|
  config.vm.provider "docker" do |d|
    d.image = "tknerr/baseimage-ubuntu:22.04"
    d.has_ssh = true
    d.name = "devsecops-portfolio-vm"
    # Pas de publication de 3000/3001 : le conteneur Vagrant ne déploie pas
    # le Portfolio (le déploiement réel se fait sur devsecops-vm via Q43).
  end

  config.vm.provision "ansible_local" do |ansible|
    ansible.playbook = "deploy_portfolio_vagrant.yml"
    ansible.install_mode = "default"
    ansible.become = true
  end
end
