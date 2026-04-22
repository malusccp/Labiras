# script_add_aliases.py

import os

aliases = [
    "alias micro='source ~/microros_ws/install/setup.bash'",
    "alias lidar='source ~/ydlidar_ros2_ws/install/setup.bash'",
    "alias srcnav='source ~/roomba_slam/roomba_nav/install/setup.bash'",
    "alias cdnav='cd ~/roomba_slam/roomba_nav'",
    "alias src='source install/setup.bash'",
]

bashrc_path = os.path.expanduser("~/.bashrc")

# Abre o arquivo .bashrc em modo de adição (append) e adiciona os aliases
with open(bashrc_path, "a") as bashrc_file:
    for alias in aliases:
        bashrc_file.write(alias + "\n")

print("Aliases adicionados ao arquivo .bashrc.")

