#Build
echo Ple-ase, confirm you are in the directory 'roomba_slam'
cd microros_agent
colcon build --symlink-install
source install/setup.bash
cd ../roomba_nav
colcon build --symlink-install
source install/setup.bash
cd ..
python3 aliases.py
source ~/.bashrc
