import sys
if sys.prefix == '/usr':
    sys.real_prefix = sys.prefix
    sys.prefix = sys.exec_prefix = '/home/diego/Documents/diego_labiras/ros_ws/install/launch_testing_examples'
