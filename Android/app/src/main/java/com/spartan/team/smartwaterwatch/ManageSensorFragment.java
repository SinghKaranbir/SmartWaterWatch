package com.spartan.team.smartwaterwatch;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

/**
 * Created by ranaf on 11/20/2015.
 */
public class ManageSensorFragment extends Fragment {

    @Override
    public View onCreateView(LayoutInflater inflater,ViewGroup viewGroup, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.manage_sensor_data_fragment, viewGroup, false);
        TextView output= (TextView)view.findViewById(R.id.msg1);
        output.setText("Manage Sensors");
        return view;
    }
}
