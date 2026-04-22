Para melhor compatibilidade com os comandos e aliases, clone o repositório dentro da sua pasta home de usuário(___$___).
Execute o script ___setup.sh___ dentro do diretório clonado ___roomba_slam___.

Os comandos pré-definidos são
# Adicionado o source do agent
micro='source ~/microros_ws/install/setup.bash'

# Adicionado o source do lidar
lidar='source ~/ydlidar_ros2_ws/install/setup.bash'

# Adicionado o source do roomba_nav
srcnav='source ~/roomba_slam/roomba_nav/install/setup.bash'

# Adicionado o cd para o roomba_nav
cdnav='cd ~/roomba_slam/roomba_nav'

# Adicionado alias para o source dentro de um repositório
src='source install/setup.bash'
